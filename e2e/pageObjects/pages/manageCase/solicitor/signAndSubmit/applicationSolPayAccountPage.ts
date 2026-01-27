import { Page, expect, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { AccessibilityOptions } from "../../../../types.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { ApplicationSolPayAccountContent } from "../constants/signAndSubmitContent.ts";

export class ApplicationSolPayAccountPage extends BaseJourneyPage {
  private readonly label1: Locator;
  private readonly label2: Locator;
  private readonly formHint: Locator;
  private readonly pbaSelect: Locator;
  private readonly referenceInput: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.label1 = page.locator(
      `${Selectors.GovukFormLabel}:text-is("${ApplicationSolPayAccountContent.content.formLabel1}")`,
    );
    this.label2 = page.locator(
      `${Selectors.GovukFormLabel}:text-is("${ApplicationSolPayAccountContent.content.formLabel2}")`,
    );
    this.formHint = page.locator(
      `${Selectors.GovukFormHint}:text-is("${ApplicationSolPayAccountContent.content.formHint}")`,
    );
    this.pbaSelect = page.locator(ApplicationSolPayAccountContent.selectors.accountNumberSelectOption);
    this.referenceInput = page.locator(ApplicationSolPayAccountContent.selectors.paymentReferenceTextBox);
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
    await this.assertPageHeading(ApplicationSolPayAccountContent.content.pageTitle);
    await Promise.all([
      expect(this.label1).toBeVisible(),
      expect(this.label2).toBeVisible(),
      expect(this.formHint).toBeVisible(),
    ]);
  }

  private async fillInFields(): Promise<void> {
    await this.pbaSelect.selectOption(
      ApplicationSolPayAccountContent.content.pbaNumber,
    );
    await this.referenceInput.fill(ApplicationSolPayAccountContent.content.reference);
    await this.clickContinue();
  }
}
