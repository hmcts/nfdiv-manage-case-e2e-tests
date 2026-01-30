import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { OtherLegalProceedingsContent } from "../constants/solicitorDraftDivorceApplicationContent.ts";

export class OtherLegalProceedingsPage extends BaseJourneyPage {
  private readonly appLegalProceedingsNo: Locator;

  constructor(page: Page) {
    super(page);
    this.appLegalProceedingsNo = page.locator(
      OtherLegalProceedingsContent.selectors.radioButtons
        .applicant1LegalProceedingsNo,
    );
  }

  public async otherLegalProceedings(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.appLegalProceedingsNo.check();
    await this.clickContinue();
  }
}
