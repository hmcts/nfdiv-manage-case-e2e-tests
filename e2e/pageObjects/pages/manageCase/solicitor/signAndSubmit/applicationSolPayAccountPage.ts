import { Page, type Locator } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { config } from "../../../../../config";
import { CommonContent } from "../../../../../common/commonContent";
export class ApplicationSolPayAccountPage extends BaseJourneyPage {
  private readonly pbaSelect: Locator;
  private readonly referenceInput: Locator;

  constructor(readonly page: Page) {
    super(page);
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
