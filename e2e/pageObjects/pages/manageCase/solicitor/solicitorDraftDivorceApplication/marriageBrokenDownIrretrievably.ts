import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class MarriageBrokenDownIrretrievablyPage extends BaseJourneyPage {
  private readonly brokenYes: Locator;

  constructor(page: Page) {
    super(page);
    this.brokenYes = page.getByRole('radio', { name: "Yes" });
  }

  public async marriageBrokenDown(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.brokenYes.check();
    await this.clickContinue();
  }
}
