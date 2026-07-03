import {Page, type Locator, expect} from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { CommonContent } from "../../../common/commonContent";
import { config } from "../../../config";

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
    const submitButton = this.page.locator("button[type='submit'], input[type='submit']").first();

    for (let attempt = 0; attempt <= RETRY_COUNT; attempt += 1) {
      try {
        await expect(submitButton).toBeVisible({ timeout: 2_000 });
        await expect.poll(() => submitButton.isEnabled().catch(() => false), { timeout: 2_000 }).toBeTruthy();
        await submitButton.click({ timeout: 10_000 });
        await this.page.waitForLoadState("domcontentloaded").catch(() => undefined);
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
}
