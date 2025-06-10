
import {Page, expect} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {CommonContent} from "../../../../../common/commonContent.ts";
import {
  ApplicationSolPayAccountContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolPayAccountContent.ts";
import {SignAndSubmitSubmitContent} from "../../../../content/manageCases/solicitor/signAndSubmit/submitContent.ts";
import {AxeUtils} from "@hmcts/playwright-common";

interface SignAndSubmitSubmitOptions {
  page: Page;
  accessibility: boolean;
  axeUtil: AxeUtils;
}

export class SignAndSubmitSubmitPage {
  public static async signAndSubmitSubmitPage({
    page,
    accessibility,
    axeUtil
  }: SignAndSubmitSubmitOptions): Promise<void> {
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
  }: Partial<SignAndSubmitSubmitOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.locator(`${Selectors.GovukHeadingL}:text-is("${ApplicationSolPayAccountContent.pageTitle}")`).waitFor();
    const answers = [
      SignAndSubmitSubmitContent.text161,
      SignAndSubmitSubmitContent.text162,
      SignAndSubmitSubmitContent.text163,
      SignAndSubmitSubmitContent.text164,
      SignAndSubmitSubmitContent.text165,
      SignAndSubmitSubmitContent.text166,
      SignAndSubmitSubmitContent.text167,
    ];

    for (const text of answers) {
      const locator = page.locator(`${Selectors.GovukText16}:text-is("${text}")`);
      await expect(locator).toBeVisible();
    }

    const h2 = page.locator(`${Selectors.h2}:text-is("${SignAndSubmitSubmitContent.h2}")`);
    const div = page.locator(`${Selectors.div}:text-is("${SignAndSubmitSubmitContent.div}")`);
    const feeCode = page.locator(`${Selectors.td}:text-is("${SignAndSubmitSubmitContent.feeCode}")`);
    const fee = page.locator(`${Selectors.GovukText16}`).filter({ hasText: `${CommonContent.fee}` });
    await Promise.all([
      expect(h2).toBeVisible(),
      expect(div).toBeVisible(),
      expect(feeCode).toBeVisible(),
      expect(fee).toHaveCount(3)
    ]);

    const yes = page.locator(`${Selectors.GovukText16}:text-is("${CommonContent.Yes}")`);
    await expect(yes).toHaveCount(5);

  }

  private static async fillInFields({
    page,
  }: Partial<SignAndSubmitSubmitOptions>): Promise<void> {
    await page?.click(`${Selectors.button}:text-is("${CommonContent.submitApplication}")`);
  }
}
