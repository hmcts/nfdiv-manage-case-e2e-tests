import { Page, expect, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { ApplicationSolPaymentSummaryContent } from "../constants/signAndSubmitContent";

export class ApplicationSolPaymentSummaryPage extends BaseJourneyPage {
  private readonly paymentMethodP: Locator;
  private readonly referenceStrong: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.paymentMethodP = page.locator(
      `${Selectors.p}:text-is("${ApplicationSolPaymentSummaryContent.content.paymentMethod}")`,
    );
    this.referenceStrong = page.locator(
      `${Selectors.strong}:text-is("${ApplicationSolPaymentSummaryContent.content.reference}")`,
    );
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
    await this.assertPageHeading(ApplicationSolPaymentSummaryContent.content.pageTitle);
    await Promise.all([
      expect(this.paymentMethodP).toBeVisible(),
      expect(this.referenceStrong).toBeVisible(),
    ]);
  }

  private async fillInFields(): Promise<void> {
    await this.clickContinue();
  }
}
