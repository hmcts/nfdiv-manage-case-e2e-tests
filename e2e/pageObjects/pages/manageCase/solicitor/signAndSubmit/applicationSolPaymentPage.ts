import { Page, expect, type Locator } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { getFee } from "../../../../../helper/fees/service/get-fee.ts";
import { CommonContent } from "../../../../../common/commonContent";

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
  private readonly feeStrong: Locator;
  private readonly feeCodeCell: Locator;
  private readonly paymentMethodRadios: Record<SolicitorPayment, Locator>;

  constructor(readonly page: Page) {
    super(page);
    this.feeStrong = page.getByText(divorceFee, { exact: true });
    this.feeCodeCell = page.getByRole("cell", { name: feeCode, exact: true });
    this.paymentMethodRadios = {
      pba: page.getByRole("radio", {
        name: paymentMethodNames.pba,
      }),
      hwf: page.getByRole("radio", {
        name: paymentMethodNames.hwf,
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
    await this.assertPageCaption(CommonContent.solSignAndSubmitPageTitle);
    await Promise.all([
      expect(this.feeStrong).toBeVisible(),
      expect(this.feeCodeCell).toBeVisible(),
    ]);
  }

  private async fillInFields({
    solicitorPayment,
  }: Pick<ApplicationSolPaymentOptions, "solicitorPayment">): Promise<void> {
    await this.paymentMethodRadios[solicitorPayment].click();
    await this.clickContinue();
  }
}
