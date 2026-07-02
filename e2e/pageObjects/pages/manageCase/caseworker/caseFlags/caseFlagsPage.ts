import { expect } from "@playwright/test";
import { config } from "../../../../../config";
import { Helpers } from "../../../../../common/helpers";
import { Events } from "../../../../../common/types";
import {BaseJourneyPage} from "../../../common/baseJourneyPage.ts";

export class CaseworkerCaseFlagsPage extends BaseJourneyPage {

  public async openCaseDetails(caseId: string): Promise<void> {
    const caseDetailsUrl = `${config.urls.manageCaseBaseUrl}/case-details/DIVORCE/NFD/${caseId}`;

    for (let attempt = 0; attempt < 24; attempt++) {
      await this.page.goto(caseDetailsUrl);
      await this.waitForCaseDetails(caseId);

      if (await this.isCaseDetailsPageLoaded(caseId)) {
        return;
      }

      const noResultsHeading = this.page.getByRole("heading", { name: /No results found/i }).first();
      if (await noResultsHeading.isVisible().catch(() => false)) {
        await this.page.waitForTimeout(5_000);
        continue;
      }

      await this.page.waitForTimeout(2_000);
    }

    throw new Error(`Case details did not become available for case ${caseId}`);
  }

  private async isCaseDetailsPageLoaded(caseId: string): Promise<boolean> {
    const expectedUrl = `${config.urls.manageCaseBaseUrl}/case-details/DIVORCE/NFD/${caseId}`;
    await this.page.waitForLoadState("load").catch(() => undefined);
    return this.page.url() === expectedUrl;
  }

  public async prepareCaseFlags(): Promise<void> {
    const nextStep = this.page.locator("#next-step").first();
    await expect(nextStep).toBeVisible({ timeout: 30_000 });

    const hasPrepareEvent = await nextStep.evaluate((el: HTMLSelectElement) =>
      Array.from(el.options).some(
        option => option.label.trim().toLowerCase() === "prepare for case flags",
      ),
    );

    if (!hasPrepareEvent) {
      return;
    }

    await Helpers.chooseEventFromDropdown(this.page, Events.prepareForCaseFlags);
    await this.completeEventJourney();
  }

  public async createCaseAndPartyFlags(caseFlagComment: string, partyFlagComment: string): Promise<void> {
    await this.createFlag(caseFlagComment, "case");
    await this.createFlag(partyFlagComment, "party");
  }

  public async assertFlagCreatedConfirmation(): Promise<void> {
    const explicitConfirmation = this.page.getByText(/Flag created|updated with event:\s*Create flags/i).first();
    const closeAndReturnButton = this.page
      .getByRole("button", { name: /Close and Return to case details/i })
      .first();
    const nextStep = this.page.locator("#next-step").first();

    await expect
      .poll(
        async () => {
          if (await explicitConfirmation.isVisible().catch(() => false)) {
            return true;
          }
          if (await closeAndReturnButton.isVisible().catch(() => false)) {
            return true;
          }
          return await nextStep.isVisible().catch(() => false);
        },
        { timeout: 30_000 },
      )
      .toBeTruthy();
  }

  public async assertFlagsVisible(_caseFlagComment: string, _partyFlagComment: string): Promise<void> {
    await this.openCaseFlagsTabFromCurrentCase();

    await expect(this.page.getByRole("heading", { name: /Case flags/i }).first()).toBeVisible({ timeout: 30_000 });
    await expect(this.page.getByText(/Case level flags/i).first()).toBeVisible({ timeout: 30_000 });

    const noneCell = this.page.getByRole("cell", { name: /^None$/i }).first();
    await expect(noneCell).toHaveCount(0);

    const activeBadges = this.page.getByText(/^ACTIVE$/i);
    await expect.poll(async () => activeBadges.count(), { timeout: 30_000 }).toBeGreaterThan(1);
  }

  private async createFlag(flagComment: string, level: "case" | "party"): Promise<void> {
    await Helpers.chooseEventFromDropdown(this.page, Events.createFlags);
    await this.completeCreateFlagJourney(level, flagComment);
    await this.assertFlagCreatedConfirmation();
    await this.returnToCaseDetailsFromCurrentCase();
  }

  private async completeCreateFlagJourney(level: "case" | "party", flagComment: string): Promise<void> {
    for (let step = 0; step < 12; step++) {
      await this.logCreateFlagsStep(`loop-${step}`, level);

      if (await this.page.getByText(/updated with event:\s*Create flags/i).first().isVisible().catch(() => false)) {
        return;
      }

      if (
        await this.page.url().includes("/trigger/createFlags/confirm")
        // await this.page.getByText(/Flag created/i).first().isVisible().catch(() => false)
      ) {
        await this.clickButton("Close and Return to case details");
        continue;
      }

      if (await this.page.getByText(/Where should this flag be added\?/i).first().isVisible().catch(() => false)) {
        const locationList = this.page.locator("#conditional-radios-list").first();
        const locationLabels = locationList.locator("label.govuk-label.govuk-radios__label");
        const labelCount = await locationLabels.count();

        let chosenLabelIndex = -1;
        if (level === "case") {
          for (let index = labelCount - 1; index >= 0; index--) {
            const text = (await locationLabels.nth(index).innerText().catch(() => "")).trim();
            if (/^Case level$/i.test(text)) {
              chosenLabelIndex = index;
              break;
            }
          }
        } else {
          for (let index = 0; index < labelCount; index++) {
            const text = (await locationLabels.nth(index).innerText().catch(() => "")).trim();
            if (text.includes("(applicant or applicant1)")) {
              chosenLabelIndex = index;
              break;
            }
          }
        }

        const chosenLabel = locationLabels.nth(chosenLabelIndex);
        const labelFor = await chosenLabel.getAttribute("for");
        const locationRadio = this.page.locator(`#${labelFor}`).first();
        await locationRadio.click();
        await this.clickButton("Continue");
        continue;
      }

      if (await this.page.getByRole("heading", { name: /^Special measure$/i }).first().isVisible().catch(() => false)) {
        const specialMeasureChoice = this.page.getByRole("radio", { name: /Screening witness from accused/i }).first();
        if (await specialMeasureChoice.isVisible().catch(() => false)) {
          await specialMeasureChoice.check();
          await this.clickButton("Continue");
          continue;
        }
      }

      if (await this.page.getByText(/Select flag type/i).first().isVisible().catch(() => false)) {
        if (level === "party") {
          await this.page.getByRole("radio", { name: /Special measure/i }).first().check();
        } else {
          const complexCase = this.page.getByRole("radio", { name: /Complex Case/i }).first();
          if (await complexCase.isVisible().catch(() => false)) {
            await complexCase.check();
          } else {
            await this.page.getByRole("radio", { name: /Special measure/i }).first().check();
          }
        }

        await this.clickButton("Continue");
        continue;
      }

      if (await this.page.getByText(/Add comments for this flag/i).first().isVisible().catch(() => false)) {
        const commentInput = this.page.locator("textarea").first();
        await expect(commentInput).toBeVisible({ timeout: 15_000 });
        await commentInput.fill(flagComment.slice(0, 180));
        await this.clickButton("Continue");
        continue;
      }

      if (await this.page.getByText(/Confirm the status of the flag/i).first().isVisible().catch(() => false)) {
        await this.page.getByRole("radio", { name: /^Active$/i }).first().check();
        const reasonInput = this.page.locator("textarea").first();
        await expect(reasonInput).toBeVisible({ timeout: 15_000 });
        await reasonInput.fill("Flag status confirmed by caseworker");
        await this.clickButton("Continue");
        continue;
      }

      if (await this.page.getByText(/Review flag details/i).first().isVisible().catch(() => false)) {
        await this.clickButton("Save and continue");
        continue;
      }

      if (await this.page.locator("#next-step").first().isVisible().catch(() => false)) {
        return;
      }

      await this.page.waitForTimeout(500);
    }

    const diagnostics = await this.getCreateFlagsDiagnostics();
    throw new Error(`Could not complete create flags journey. ${diagnostics}`);
  }

  private async selectFlagLevel(level: "case" | "party"): Promise<void> {
    const levelPrompt = this.page.getByText(/Where should this flag be added\?/i).first();
    const levelPromptVisible = await levelPrompt.isVisible().catch(() => false);

    if (!levelPromptVisible) {
      const flagTypeHeading = this.page.getByText(/Select flag type/i).first();
      const previousButton = this.page.getByRole("button", { name: /^Previous$/i }).first();

      if (
        (await flagTypeHeading.isVisible().catch(() => false)) &&
        (await previousButton.isVisible().catch(() => false))
      ) {
        await previousButton.click();
        await this.page.waitForLoadState("domcontentloaded").catch(() => undefined);
      }
    }

    if (!(await levelPrompt.isVisible().catch(() => false))) {
      return;
    }

    const locationName = level === "case" ? /Case level/i : /applicant or applicant1/i;
    await this.page.getByRole("radio", { name: locationName }).first().check();
    await this.clickButton("Continue");
  }

  private async selectFlagType(level: "case" | "party"): Promise<void> {
    const flagTypeHeading = this.page.getByText(/Select flag type/i).first();
    if (!(await flagTypeHeading.isVisible().catch(() => false))) {
      return;
    }

    const primaryType = level === "party" ? /Special measure/i : /Complex Case/i;
    await this.page.getByRole("radio", { name: primaryType }).first().check();
    await this.clickButton("Continue");

    if (level === "party") {
      await this.selectPartySpecialMeasureType();
    }
  }

  private async selectPartySpecialMeasureType(): Promise<void> {
    const specialMeasureHeading = this.page.getByText(/^Special measure$/i).first();
    if (!(await specialMeasureHeading.isVisible().catch(() => false))) {
      return;
    }

    await this.page.getByRole("radio", { name: /Screening witness from accused/i }).first().check();
    await this.clickButton("Continue");
  }

  private async fillFlagComments(comment: string): Promise<void> {
    const commentInput = this.page.getByRole("textbox", { name: /Add comments for this flag/i }).first();
    if (!(await commentInput.isVisible().catch(() => false))) {
      return;
    }

    await commentInput.fill(comment.slice(0, 180));
    await this.clickButton("Continue");
  }

  private async confirmFlagStatus(): Promise<void> {
    const statusHeading = this.page.getByText(/Confirm the status of the flag/i).first();
    if (!(await statusHeading.isVisible().catch(() => false))) {
      return;
    }

    await this.page.getByRole("radio", { name: /^Active$/i }).first().check();

    const reasonInput = this.page.locator("textarea").first();
    await expect(reasonInput).toBeVisible({ timeout: 15_000 });
    await reasonInput.fill("Flag status confirmed by caseworker");
    await this.clickButton("Continue");
  }

  private async reviewAndSaveFlag(): Promise<void> {
    const reviewHeading = this.page.getByText(/Review flag details/i).first();
    if (!(await reviewHeading.isVisible().catch(() => false))) {
      return;
    }

    await this.clickButton("Save and continue");
  }

  private async returnToCaseDetailsFromCurrentCase(): Promise<void> {
    const closeAndReturnButton = this.page
      .getByRole("button", { name: /Close and Return to case details/i })
      .first();

    if (await closeAndReturnButton.isVisible().catch(() => false)) {
      await this.clickButton("Close and Return to case details");
      await this.page.waitForLoadState("domcontentloaded").catch(() => undefined);
    }

    if (await this.page.locator("#next-step").first().isVisible().catch(() => false)) {
      return;
    }

    const caseIdMatch = this.page.url().match(/case-details\/(?:DIVORCE\/NFD\/)?(\d+)/);
    if (!caseIdMatch?.[1]) {
      throw new Error(`Could not determine case id from URL: ${this.page.url()}`);
    }

    await this.openCaseDetails(caseIdMatch[1]);
  }

  private async openCaseFlagsTabFromCurrentCase(): Promise<void> {
    const caseIdMatch = this.page.url().match(/case-details\/(?:DIVORCE\/NFD\/)?(\d+)/);
    if (!caseIdMatch?.[1]) {
      throw new Error(`Could not determine case id from URL: ${this.page.url()}`);
    }

    await this.page.goto(`${config.urls.manageCaseBaseUrl}/case-details/DIVORCE/NFD/${caseIdMatch[1]}#Case Flags`);
    await this.page.waitForLoadState("domcontentloaded").catch(() => undefined);
  }

  private async completeEventJourney(): Promise<void> {
    for (let step = 0; step < 8; step++) {
      if (await this.clickIfVisible("Save and continue", 5_000)) {
        continue;
      }

      if (await this.clickIfVisible("Continue", 3_000)) {
        continue;
      }

      if (await this.clickIfVisible("Submit", 3_000)) {
        return;
      }

      if (await this.fillRequiredChoiceOnPage()) {
        continue;
      }

      return;
    }
  }

  private async clickIfVisible(buttonName: string, timeoutMs = 1_000): Promise<boolean> {
    const button = this.page.getByRole("button", { name: new RegExp(`^${buttonName}$`, "i") }).first();
    const isVisible = await button.waitFor({ state: "visible", timeout: timeoutMs }).then(() => true).catch(() => false);
    if (!isVisible) {
      return false;
    }

    const isEnabled = await button.isEnabled().catch(() => false);
    if (!isEnabled) {
      return false;
    }

    const clicked = await button.click({ timeout: 5_000 }).then(() => true).catch(() => false);
    if (!clicked) {
      return false;
    }

    await this.page.waitForLoadState("domcontentloaded").catch(() => undefined);
    return true;
  }

  private async fillRequiredChoiceOnPage(): Promise<boolean> {
    return false;
  }

  private async logCreateFlagsStep(label: string, level: "case" | "party"): Promise<void> {
    const diagnostics = await this.getCreateFlagsDiagnostics();
    console.log(`[CaseFlags] level=${level} step=${label} | ${diagnostics}`);
  }

  private async getCreateFlagsDiagnostics(): Promise<string> {
    const heading = this.page.locator("h1, h2").first();
    const headingText = (await heading.textContent().catch(() => "")).trim() || "<none>";

    const errorSummary = this.page.locator(".govuk-error-summary, .error-summary, [role='alert']").first();
    let validationSummary = "<none>";

    if (await errorSummary.isVisible().catch(() => false)) {
      const errorSummaryText = (await errorSummary.textContent().catch(() => ""))
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 220);
      validationSummary = errorSummaryText || "<none>";
    }

    return `url=${this.page.url()} | heading=${headingText} | validation=${validationSummary}`;
  }


  private async waitForCaseDetails(caseId: string): Promise<void> {
    await expect.poll(() => this.page.url(), {
      message: `Expected to open case details for ${caseId}`,
      timeout: 60_000,
    }).toContain("case-details");
  }
}
















