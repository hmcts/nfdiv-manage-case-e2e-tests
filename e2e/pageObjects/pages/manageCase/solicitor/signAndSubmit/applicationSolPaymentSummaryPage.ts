import { Page, expect, type Locator } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

const pageCaption = "Sign and submit";
const paymentMethod = "Payment Method: Fee Account";
const paymentReference = "Test";

export class ApplicationSolPaymentSummaryPage extends BaseJourneyPage {
  private readonly paymentMethodP: Locator;
  private readonly referenceStrong: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.paymentMethodP = page.getByText(paymentMethod, { exact: true });
    this.referenceStrong = page.getByText(paymentReference, { exact: true });
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
    await this.assertPageCaption(pageCaption);
    await Promise.all([
      expect(this.paymentMethodP).toBeVisible(),
      expect(this.referenceStrong).toBeVisible(),
    ]);
  }

  private async fillInFields(): Promise<void> {
    await this.clickContinue();
  }
}
