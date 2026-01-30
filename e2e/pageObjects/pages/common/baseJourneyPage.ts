import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { CommonContent } from "../../../common/commonContent.ts";
import { config } from "../../../config.ts";

export abstract class BaseJourneyPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigateToCreateCasePage(): Promise<void> {
    await this.page.goto(config.urls.manageCaseBaseUrl + "/case-filter");
  }

  async assertPageHeading(text: string): Promise<void> {
    await this.page
      .locator(`${Selectors.GovukCaptionL}:text-is("${text}")`)
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
}
