import {Page} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {CommonContent} from "../../../../content/CommonContent.ts";

enum RadioButtonElementIds {
  applicant1FinancialOrderNo = '#applicant1FinancialOrder_No',
}

export class FinancialOrdersPage {

    public static async financialOrders(
        page: Page,
    ): Promise<void> {

        await this.checkPageLoads(page);
        await this.fillInFields(page);
    }

    private static async checkPageLoads(
        page: Page,
    ): Promise<void> {
        await page.locator(`${Selectors.GovukCaptionL}:text-is("${CommonContent.pageTitle}")`,).waitFor();
    }

    private static async fillInFields(
        page: Page,
    ): Promise<void> {

        await page.locator(RadioButtonElementIds.applicant1FinancialOrderNo).check();

        await page.click(
            `${Selectors.button}:text-is("${CommonContent.continueButton}")`,
        );
    }
}
