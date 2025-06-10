import {Page, expect} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {
    ApplicationSolStatementOfTruthContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolStatementOfTruthContent.ts";
import {CommonContent} from "../../../../../common/commonContent.ts";
import {AxeUtils} from "@hmcts/playwright-common";

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
  accessibility: boolean;
  axeUtil: AxeUtils;
}

export class ApplicationSolStatementOfTruthPage {
    public static async applicationSolStatementOfTruthPage({
        page,
        accessibility,
        axeUtil
    }: ApplicationSolStatementOfTruthOptions): Promise<void> {
        await this.checkPageLoads({
            page: page,
        });
        await this.fillInFields({
            page: page,
        });
        if (accessibility) {
            await axeUtil.audit();
        }
    }

    private static async checkPageLoads({
        page,
    }: Partial<ApplicationSolStatementOfTruthOptions>): Promise<void> {
        if (!page) {
            throw new Error("Page is not defined)");
        }
        await page.locator(
            `${Selectors.GovukHeadingL}:text-is("${ApplicationSolStatementOfTruthContent.pageTitle}")`
        ).waitFor();
        const headings = [
            ApplicationSolStatementOfTruthContent.h2_1,
            ApplicationSolStatementOfTruthContent.h2_2,
            ApplicationSolStatementOfTruthContent.h2_3,
            ApplicationSolStatementOfTruthContent.h2_4,
        ];

        for (const text of headings) {
            const locator = page.locator(`h2:text-is("${text}")`);
            await expect(locator).toBeVisible();
        }
    }

    private static async fillInFields({
        page,
    }: Partial<ApplicationSolStatementOfTruthOptions>): Promise<void> {
        for (const selector of Object.values(RadioButtons)) {
            await page?.click(selector);
        }
        await page?.fill(textBoxes.name, ApplicationSolStatementOfTruthContent.name);
        await page?.fill(textBoxes.firmName, ApplicationSolStatementOfTruthContent.firmName);
        await page?.click(`${Selectors.button}:text-is("${CommonContent.continue}")`);
    }
}
