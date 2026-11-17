import { Page } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { CommonContent } from "../../../../../common/commonContent";
export class ApplicationSolPaymentSummaryPage extends BaseJourneyPage {

  constructor(readonly page: Page) {
    super(page);
  }

  public async applicationSolPaymentSummaryPage({
    accessibility,
    axeUtil,
  }: AccessibilityOptions): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
    if (accessibility) {
      await axeUtil.audit();
    }
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.solSignAndSubmitPageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.clickContinue();
  }
}
