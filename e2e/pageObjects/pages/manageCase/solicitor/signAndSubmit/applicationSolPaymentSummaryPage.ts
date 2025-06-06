
import {Page, expect} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {
  ApplicationSolPaymentContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolPaymentContent.ts";
import {CommonContent} from "../../../../../common/commonContent.ts";
import {
  ApplicationSolPaymentSummaryContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolPaymentSummaryContent.ts";
import {
  ApplicationSolPayAccountContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolPayAccountContent.ts";

interface ApplicationSolPaymentSummaryOptions {
  page: Page;
}

export class ApplicationSolPaymentSummaryPage {
  public static async applicationSolPaymentSummaryPage({
                                                  page,
                                                }: ApplicationSolPaymentSummaryOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
    });
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
                                        page,
                                      }: Partial<ApplicationSolPaymentSummaryOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.locator(`${Selectors.GovukHeadingL}:text-is("${ApplicationSolPaymentContent.pageTitle}")`).waitFor();

    const pTag = page.locator(`${Selectors.p}:text-is("${ApplicationSolPaymentSummaryContent.p}")`);
    const strong = page.locator(`${Selectors.td}:text-is("${ApplicationSolPayAccountContent.reference}")`);

    await Promise.all([
      expect(pTag).toBeVisible(),
      expect(strong).toBeVisible(),
    ]);

  }

  private static async fillInFields({
                                      page,
                                    }: ApplicationSolPaymentSummaryOptions): Promise<void> {
    await page.click(`${Selectors.button}:text-is("${CommonContent.continue}")`);
  }
}
