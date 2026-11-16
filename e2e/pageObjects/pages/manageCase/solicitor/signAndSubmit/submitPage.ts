import { Page, expect, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { config } from "../../../../../config";

const orderSummary = "Order Summary";
const feeCode = "FEE0002";
const answerTexts = [
  "Court Service",
  "I confirm the applicant is applying to the court to dissolve their marriage (get a divorce)",
  "Solicitor_app_test",
  "NFD Solicitor Firm",
  "Solicitor fee account (PBA)",
  config.solicitor.pba,
  "test reference",
] as const;

export class SignAndSubmitSubmitPage extends BaseJourneyPage {
  private readonly h2CheckAnswers: Locator;
  private readonly orderSummaryDiv: Locator;
  private readonly feeCodeCell: Locator;
  private readonly yesTexts: Locator;
  private readonly submitButton: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.h2CheckAnswers = page.getByRole("heading", {
      name: "Check your answers",
      exact: true,
    });
    this.orderSummaryDiv = page.getByText(orderSummary, { exact: true });
    this.feeCodeCell = page.getByRole("cell", { name: feeCode, exact: true });
    this.yesTexts = page.getByText(CommonContent.Yes, { exact: true });
    this.submitButton = page.getByRole("button", {
      name: CommonContent.submitApplication
    });
  }

  public async signAndSubmitSubmitPage({
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
    for (const text of answerTexts) {
      await expect(this.page.getByText(text, { exact: true })).toBeVisible();
    }
    await Promise.all([
      expect(this.h2CheckAnswers).toBeVisible(),
      expect(this.orderSummaryDiv).toBeVisible(),
      expect(this.feeCodeCell).toBeVisible(),
    ]);
    await expect(this.yesTexts).toHaveCount(4);
  }

  private async fillInFields(): Promise<void> {
    await this.submitButton.click();
  }
}
