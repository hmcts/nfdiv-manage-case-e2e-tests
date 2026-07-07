import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class FinancialOrdersPage extends BaseJourneyPage {
  private readonly appFinancialOrderNoRadio: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.appFinancialOrderNoRadio = page.locator(
      "#applicant1FinancialOrder_No",
    );
  }

  public async financialOrders() {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads() {
    await this.assertPageCaption(CommonContent.pageTitle);
  }

  private async fillInFields() {
    await this.appFinancialOrderNoRadio.check();
    await this.clickContinue();
  }
}
