import {Page, expect} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {
  ApplicationSolStatementOfTruthContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolStatementOfTruthContent.ts";
import {CommonContent} from "../../../../../common/commonContent.ts";

enum textBoxes {
  name = "#solStatementOfReconciliationName",
  firmName = "#solStatementOfReconciliationFirm"
}

enum RadioButtons {
  urgerntIssueYes = "#solUrgentCase_Yes",
  courtService = "#serviceMethod-courtService",
  statementOfReconciliationYes = "#solStatementOfReconciliationCertify_Yes",
  statementOfReconciliationDiscussedYes = "#solStatementOfReconciliationDiscussed_Yes",
  thePrayerApplyingToDissolve = "#applicant1PrayerDissolveDivorce-dissolveDivorce",
  factsInApplicationTrue = "#applicant1StatementOfTruth_Yes",
  authroisedToSignStatement = "#solSignStatementOfTruth_Yes",
}

interface ApplicationSolStatementOfTruthOptions {
  page: Page;
}

export class ApplicationSolStatementOfTruthPage {
  public static async applicationSolStatementOfTruthPage({
                                        page,
                                      }: ApplicationSolStatementOfTruthOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
    });
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page,
  }: ApplicationSolStatementOfTruthOptions): Promise<void> {
    await page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ApplicationSolStatementOfTruthContent.pageTitle}")`
    ).waitFor();
    const headings = [
      ApplicationSolStatementOfTruthContent.h21,
      ApplicationSolStatementOfTruthContent.h22,
      ApplicationSolStatementOfTruthContent.h23,
      ApplicationSolStatementOfTruthContent.h24,
    ];

    for (const text of headings) {
      const locator = page.locator(`h2:text-is("${text}")`);
      await expect(locator).toBeVisible();
    }

    await Promise.all([
      expect(page.locator(`${Selectors.strong}:text-is("${ApplicationSolStatementOfTruthContent.strong}")`)).toBeVisible(),
      expect(page.locator(`${Selectors.GovukFormHint}:text-is("${ApplicationSolStatementOfTruthContent.formHint}")`)).toBeVisible(),
    ]);
  }

  private static async fillInFields({
                                      page,
                                    }: ApplicationSolStatementOfTruthOptions): Promise<void> {
    for (const selector of Object.values(RadioButtons)) {
      await page.click(selector);
  }
    await page.fill(textBoxes.name, ApplicationSolStatementOfTruthContent.name);
    await page.fill(textBoxes.firmName, ApplicationSolStatementOfTruthContent.firmName);
    await page.click(`${Selectors.button}:text-is("${CommonContent.continue}")`);
  }
}
