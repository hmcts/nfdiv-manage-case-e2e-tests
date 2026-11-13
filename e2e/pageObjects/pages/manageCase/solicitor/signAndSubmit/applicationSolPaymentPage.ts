import { Page, expect, type Locator } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { getFee } from "../../../../../helper/fees/service/get-fee.ts";

const pageCaption = "Payment for this application";
const orderSummary = "Order Summary";
const feeCode = "FEE0002";
const paymentMethodNames = {
  pba: "Solicitor fee account (PBA)",
  hwf: "Help With Fees",
} as const;

type SolicitorPayment = keyof typeof paymentMethodNames;
type ApplicationSolPaymentOptions = AccessibilityOptions & {
  solicitorPayment: SolicitorPayment;
};

const divorceFee = await getFee("DivorceCivPart");

export class ApplicationSolPaymentPage extends BaseJourneyPage {
  private readonly formLabel1: Locator;
  private readonly formLabel2: Locator;
  private readonly formLabel3: Locator;
  private readonly feeStrong: Locator;
  private readonly orderSummaryDiv: Locator;
  private readonly feeCodeCell: Locator;
  private readonly paymentMethodRadios: Record<SolicitorPayment, Locator>;

  constructor(readonly page: Page) {
    super(page);
    this.formLabel1 = page.getByText("How is payment being made?", {
      exact: true,
    });
    this.formLabel2 = page.getByText(paymentMethodNames.pba, { exact: true });
    this.formLabel3 = page.getByText(paymentMethodNames.hwf, { exact: true });
    this.feeStrong = page.getByText(divorceFee, { exact: true });
    this.orderSummaryDiv = page.getByText(orderSummary, { exact: true });
    this.feeCodeCell = page.getByRole("cell", { name: feeCode, exact: true });
    this.paymentMethodRadios = {
      pba: page.getByRole("radio", {
        name: paymentMethodNames.pba,
        exact: true,
      }),
      hwf: page.getByRole("radio", {
        name: paymentMethodNames.hwf,
        exact: true,
      }),
    };
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
    await this.assertPageHeading(pageCaption);
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
    await this.paymentMethodRadios[solicitorPayment].check();
    await this.clickContinue();
  }
}
