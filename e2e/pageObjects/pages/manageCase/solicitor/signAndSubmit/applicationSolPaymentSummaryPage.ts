
import {Page, expect} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {CommonContent} from "../../../../../common/commonContent.ts";
import {
  ApplicationSolPaymentSummaryContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolPaymentSummaryContent.ts";
import {
  ApplicationSolPayAccountContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolPayAccountContent.ts";
import {AxeUtils} from "@hmcts/playwright-common";

interface ApplicationSolPaymentSummaryOptions {
  page: Page;
  accessibility: boolean;
  axeUtil: AxeUtils;
}

export class ApplicationSolPaymentSummaryPage {
  public static async applicationSolPaymentSummaryPage({
                                                  page,
    accessibility,
    axeUtil
                                                }: ApplicationSolPaymentSummaryOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
    });
    await this.fillInFields({
      page: page,
    });
    if (accessibility) {
      await axeUtil.audit()
    }
  }

  private static async checkPageLoads({
                                        page,
                                      }: Partial<ApplicationSolPaymentSummaryOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.locator(`${Selectors.GovukHeadingL}:text-is("${ApplicationSolPayAccountContent.pageTitle}")`).waitFor();
    const pTag = page.locator(`${Selectors.p}:text-is("${ApplicationSolPaymentSummaryContent.p}")`);
    const strong = page.locator(`${Selectors.strong}:text-is("${ApplicationSolPayAccountContent.reference}")`);
    await Promise.all([
      expect(pTag).toBeVisible(),
      expect(strong).toBeVisible(),
    ]);

  }

  private static async fillInFields({
    page,
  }: Partial<ApplicationSolPaymentSummaryOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.click(`${Selectors.button}:text-is("${CommonContent.continue}")`);
  }
}
