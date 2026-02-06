import { Page, expect, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { AccessibilityOptions } from "../../../../types.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { ApplicationSolPaymentContent } from "../constants/signAndSubmitContent.ts";

type ApplicationSolPaymentOptions = AccessibilityOptions & {
  solicitorPayment: keyof typeof ApplicationSolPaymentContent.selectors.radioButtons;
};

export class ApplicationSolPaymentPage extends BaseJourneyPage {
  private readonly formLabel1: Locator;
  private readonly formLabel2: Locator;
  private readonly formLabel3: Locator;
  private readonly feeStrong: Locator;
  private readonly orderSummaryDiv: Locator;
  private readonly feeCodeCell: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.formLabel1 = page.locator(
      `${Selectors.GovukFormLabel}:text-is("${ApplicationSolPaymentContent.content.formLabel1}")`,
    );
    this.formLabel2 = page.locator(
      `${Selectors.GovukFormLabel}:text-is("${ApplicationSolPaymentContent.content.formLabel2}")`,
    );
    this.formLabel3 = page.locator(
      `${Selectors.GovukFormLabel}:text-is("${ApplicationSolPaymentContent.content.formLabel3}")`,
    );
    this.feeStrong = page.locator(
      `${Selectors.strong}:text-is("${CommonContent.fee}")`,
    );
    this.orderSummaryDiv = page.locator(
      `${Selectors.div}:text-is("${ApplicationSolPaymentContent.content.div}")`,
    );
    this.feeCodeCell = page.locator(
      `${Selectors.td}:text-is("${ApplicationSolPaymentContent.content.td}")`,
    );
  }

  public async applicationSolPaymentPage({
    accessibility,
    axeUtil,
    solicitorPayment,
  }: ApplicationSolPaymentOptions): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields({ solicitorPayment });
    if (accessibility) {
      await axeUtil.audit();
    }
  }

  private async checkPageLoads(): Promise<void> {
    // Uses a different heading locator to the base method
    await this.page
      .locator(
        `${Selectors.GovukHeadingL}:text-is("${ApplicationSolPaymentContent.content.pageTitle}")`,
      )
      .waitFor();
    // await this.assertPageHeading(ApplicationSolPaymentContent.pageTitle);
    await Promise.all([
      expect(this.formLabel1).toBeVisible(),
      expect(this.formLabel2).toBeVisible(),
      expect(this.formLabel3).toBeVisible(),
      expect(this.feeStrong).toBeVisible(),
      expect(this.orderSummaryDiv).toBeVisible(),
      expect(this.feeCodeCell).toBeVisible(),
    ]);
  }

  private async fillInFields({
    solicitorPayment,
  }: Pick<ApplicationSolPaymentOptions, "solicitorPayment">): Promise<void> {
    await this.page.click(
      ApplicationSolPaymentContent.selectors.radioButtons[solicitorPayment],
    );

    await this.clickContinue();
  }
}
