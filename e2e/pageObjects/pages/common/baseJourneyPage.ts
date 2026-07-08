import {expect, type Locator, Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {CommonContent} from "../../../common/commonContent";
import {config} from "../../../config";
import {IdamPage} from "@hmcts/playwright-common";
import {UserCredentials} from "@hmcts/playwright-common/dist/page-objects/pages/idam.po";
import {Helpers} from "../../../common/helpers.ts";

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
    await Helpers.clickButton(this.page, text);
  }

  async clickContinue(): Promise<void> {
    await this.clickButton(CommonContent.continue);
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.clickButton(CommonContent.saveAndContinue);
  }

  public async openCaseDetails(caseId: string, user: UserCredentials, idamPage: IdamPage): Promise<void> {
    const caseDetailsUrl = `${config.urls.manageCaseBaseUrl}/case-details/DIVORCE/NFD/${caseId}#History`;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        if (this.page.url() !== caseDetailsUrl) {
          await this.page.goto(caseDetailsUrl, { timeout: 30_000 });
          await this.page.waitForTimeout(2_000);
          await this.checkLoginRequired(user, idamPage);
        }
        await this.checkCaseNotFound(caseId);
        await this.caseDetailsLoaded(caseId)
        return;
      } catch (error) {
        if (error.cause === 'notFound' || attempt === 4) {
          throw error;
        }
        console.log(error.message);
      }
    }
  }

  private async caseDetailsLoaded(caseId: string): Promise<void> {
    const nextStep = this.page.locator(Selectors.nextStep);
    try {
      await expect(nextStep).toBeVisible({ timeout: 2_000 });
      console.log(`Case loaded: ${caseId}`);
      return;
    } catch (error) {
      console.log(`nextStep element not found for case: ${caseId} at: ${this.page.url()}`);
      throw error;
    }
  }

  private async checkLoginRequired(user: UserCredentials, idamPage: IdamPage): Promise<void> {
    if (this.page.url().includes("idam-web-public.")) {
      console.log("IDAM redirection detected. Attempting log in...");
      try {
        await idamPage.login(user);
        await this.page.waitForTimeout(2_000);
        expect(this.page.url()).not.toContain("idam-web-public.");
        await this.page.waitForLoadState("load", { timeout: 30_000 });
        console.log('IDAM login successful.');
      } catch (error) {
        console.log("IDAM login failed");
        throw error;
      }
    }
  }

  private async checkCaseNotFound(caseId: string): Promise<void> {
    const noResultsHeading = this.page.getByRole("heading", { name: /No results found/i }).first();
    if (await noResultsHeading.isVisible()) {
      const errorMessage = `Case id ${caseId} not found.`;
      console.log(errorMessage);
      throw new Error(errorMessage, { cause: "notFound" });
    }
  }
}
