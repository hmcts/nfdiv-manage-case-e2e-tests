import { Page, expect, type Locator } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { ApplicationSolStatementOfTruthContent } from "../constants/signAndSubmitContent.ts";

export class ApplicationSolStatementOfTruthPage extends BaseJourneyPage {
  private readonly serviceMethod: Locator;
  private readonly statementRecon: Locator;
  private readonly thePrayer: Locator;
  private readonly statementTruth: Locator;
  private readonly nameInput: Locator;
  private readonly firmInput: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.serviceMethod = page.locator(
      `h2:text-is("${ApplicationSolStatementOfTruthContent.content.h2_1}")`,
    );
    this.statementRecon = page.locator(
      `h2:text-is("${ApplicationSolStatementOfTruthContent.content.h2_2}")`,
    );
    this.thePrayer = page.locator(
      `h2:text-is("${ApplicationSolStatementOfTruthContent.content.h2_3}")`,
    );
    this.statementTruth = page.locator(
      `h2:text-is("${ApplicationSolStatementOfTruthContent.content.h2_4}")`,
    );
    this.nameInput = page.locator(
      ApplicationSolStatementOfTruthContent.selectors.textBoxes.name,
    );
    this.firmInput = page.locator(
      ApplicationSolStatementOfTruthContent.selectors.textBoxes.firmName,
    );
  }

  public async applicationSolStatementOfTruthPage({
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
    await this.assertPageHeading(
      ApplicationSolStatementOfTruthContent.content.pageTitle,
    );
    await Promise.all([
      expect(this.serviceMethod).toBeVisible(),
      expect(this.statementRecon).toBeVisible(),
      expect(this.thePrayer).toBeVisible(),
      expect(this.statementTruth).toBeVisible(),
    ]);
  }

  private async fillInFields(): Promise<void> {
    for (const selector of Object.values(
      ApplicationSolStatementOfTruthContent.selectors.radioButtons,
    )) {
      await this.page.click(selector);
    }
    await this.nameInput.fill(
      ApplicationSolStatementOfTruthContent.content.name,
    );
    await this.firmInput.fill(
      ApplicationSolStatementOfTruthContent.content.firmName,
    );
    await this.clickContinue();
  }
}
