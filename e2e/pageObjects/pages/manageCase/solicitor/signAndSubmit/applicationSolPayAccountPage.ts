import { Page, expect, type Locator } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { config } from "../../../../../config";

const pageCaption = "Sign and submit";
const accountNumberLabel = "Select your account number";
const referenceLabel = "Enter your payment reference";
const referenceHint =
  "This will appear on your statement to help you identify this payment";
const paymentReference = "Test";

export class ApplicationSolPayAccountPage extends BaseJourneyPage {
  private readonly label1: Locator;
  private readonly label2: Locator;
  private readonly formHint: Locator;
  private readonly pbaSelect: Locator;
  private readonly referenceInput: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.label1 = page.getByText(accountNumberLabel, { exact: true });
    this.label2 = page.getByText(referenceLabel, { exact: true });
    this.formHint = page.getByText(referenceHint, { exact: true });
    this.pbaSelect = page.getByLabel(accountNumberLabel, { exact: true });
    this.referenceInput = page.getByLabel(referenceLabel, { exact: true });
  }

  public async applicationSolPayAccountPage({
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
      expect(this.label1).toBeVisible(),
      expect(this.label2).toBeVisible(),
      expect(this.formHint).toBeVisible(),
    ]);
  }

  private async fillInFields(): Promise<void> {
    await this.pbaSelect.selectOption(config.solicitor.pba);
    await this.referenceInput.fill(paymentReference);
    await this.clickContinue();
  }
}
