import { Page, expect, type Locator } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { config } from "../../../../../config";
import { CommonContent } from "../../../../../common/commonContent";
export class ApplicationSolPayAccountPage extends BaseJourneyPage {
  // private readonly label1: Locator;
  // private readonly label2: Locator;
  // private readonly formHint: Locator;
  private readonly pbaSelect: Locator;
  private readonly referenceInput: Locator;

  constructor(readonly page: Page) {
    super(page);
    // this.label1 = page.getByText(accountNumberLabel, { exact: true });
    // this.label2 = page.getByText(referenceLabel, { exact: true });
    // this.formHint = page.getByText(referenceHint, { exact: true });
    this.pbaSelect = page.getByRole("combobox", { name: "Select your account number"});
    this.referenceInput = page.getByRole("textbox", { name: "Enter your payment reference" });
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
    await this.assertPageCaption(CommonContent.solSignAndSubmitPageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.pbaSelect.selectOption(config.solicitor.pba);
    await this.referenceInput.fill("test reference");
    await this.clickContinue();
  }
}
