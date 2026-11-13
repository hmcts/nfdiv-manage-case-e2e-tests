import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class OtherLegalProceedingsPage extends BaseJourneyPage {
  private readonly appLegalProceedingsNo: Locator;

  constructor(page: Page) {
    super(page);
    this.appLegalProceedingsNo = page.getByRole("radio", { name: "No" });
  }

  public async otherLegalProceedings(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.appLegalProceedingsNo.check();
    await this.clickContinue();
  }
}
