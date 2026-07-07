import {Page, type Locator, expect} from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { CommonContent } from "../../../common/commonContent";
import { config } from "../../../config";
import {IdamPage} from "@hmcts/playwright-common";
import {UserCredentials} from "@hmcts/playwright-common/dist/page-objects/pages/idam.po";

export abstract class BaseJourneyPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigateToCreateCasePage(): Promise<void> {
    await this.page.goto(config.urls.manageCaseBaseUrl + "/case-filter");
  }

  async assertPageCaption(text: string): Promise<void> {
    await this.page
      .locator(`${Selectors.GovukCaptionL}:text-is("${text}")`)
      .waitFor();
  }

  async assertPageHeading(text: string): Promise<void> {
    await this.page
      .locator(`${Selectors.GovukHeadingL}:text-is("${text}")`)
      .waitFor();
  }

  protected byText(selector: string, text: string): Locator {
    return this.page.locator(`${selector}:text-is("${text}")`);
  }

  buttonByText(text: string): Locator {
    return this.byText(Selectors.button, text);
  }

  async clickButton(text: string): Promise<void> {
    await this.buttonByText(text).click();
  }

  async clickContinue(): Promise<void> {
    // Both continue and continueButton map to "Continue" in CommonContent
    await this.clickButton(CommonContent.continue);
  }

  public async clickSubmit(RETRY_COUNT = 5): Promise<void> {
    const submitButton = this.page.locator(Selectors.SubmitButton).first();

    for (let attempt = 0; attempt <= RETRY_COUNT; attempt += 1) {
      try {
        await expect(submitButton).toBeVisible({ timeout: 2_000 });
        await expect.poll(() => submitButton.isEnabled().catch(() => false), { timeout: 2_000 }).toBeTruthy();
        await submitButton.click({ timeout: 5_000 });
        await this.page.waitForLoadState("load").catch(() => undefined);
        return;
      } catch (error) {
        const message = String(error);
        const recoverable =
          message.includes("toBeVisible") ||
          message.includes("element(s) not found") ||
          message.includes("not enabled") ||
          message.includes("Timeout");

        if (!recoverable || attempt === RETRY_COUNT) {
          console.log(`[clickSubmit failed | attempt=${attempt + 1}`);
          throw error;
        }
      }
    }
  }

  public async openCaseDetails(caseId: string, idamPage?: IdamPage): Promise<void> {
    const caseDetailsUrl = `${config.urls.manageCaseBaseUrl}/case-details/DIVORCE/NFD/${caseId}#History`;

    for (let attempt = 0; attempt <= 4; attempt += 1) {
      try {
        await this.page.goto(caseDetailsUrl);
      } catch (error) {
        if (attempt === 4) {
          throw error;
        }

        await this.page.waitForTimeout(2_000);
        continue;
      }

      if (await this.isCaseDetailsPageLoaded(caseId, idamPage, config.users.caseworker)) {
        return;
      }

      const noResultsHeading = this.page.getByRole("heading", { name: /No results found/i }).first();
      if (await noResultsHeading.isVisible()) {
        throw new Error(`Case id ${caseId} not found.`);
      }

      await this.page.waitForTimeout(2_000);
    }

    throw new Error(`Case details did not become available for case ${caseId}`);
  }

  private async isCaseDetailsPageLoaded(caseId: string, idamPage: IdamPage, user: UserCredentials): Promise<boolean> {
    const nextStep = this.page.locator("#next-step").first();

    try {
      await expect(nextStep).toBeVisible({ timeout: 5_000 });
      return true;
    } catch (error) {
      console.log(`nextStep element not found for case ${caseId}`);
      console.log(`Url = ${this.page.url()}`);

      if (this.page.url().includes("idam-web-public.")) {
        console.log("IDAM redirection detected. Attempting log in...");
        await idamPage.page.waitForLoadState("load");
        await idamPage.login(user);
        await this.page.waitForLoadState("load");
        return await expect(nextStep)
          .toBeVisible({ timeout: 5_000 })
          .then(() => {
            console.log("IDAM login successful.");
            return true;
          })
          .catch(() => {
            console.log("IDAM login failed.");
            return false;
          });
      }

      console.log(error.log);
      return false;
    }
  }
}
