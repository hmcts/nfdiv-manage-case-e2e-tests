import { Page, type Locator } from "@playwright/test";
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
    await this.page.getByText(text, { exact: true }).waitFor();
  }

  async assertPageHeading(text: string): Promise<void> {
    await this.page.getByRole("heading", { name: text, exact: true }).waitFor();
  }

  buttonByText(text: string): Locator {
    return this.page.getByRole("button", { name: text, exact: true });
  }

  async clickButton(text: string): Promise<void> {
    await this.buttonByText(text).click();
  }

  async clickContinue(): Promise<void> {
    // Both continue and continueButton map to "Continue" in CommonContent
    await this.clickButton(CommonContent.continue);
  }
}
