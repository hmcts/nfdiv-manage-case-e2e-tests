import {Page, expect} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {
  ApplicationSolPaymentContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolPaymentContent.ts";
import {CommonContent} from "../../../../../common/commonContent.ts";
import {AxeUtils} from "@hmcts/playwright-common";

export enum SolicitorPayment {
  PBA = "#solPaymentHowToPay-feePayByAccount",
  HWF = "#solPaymentHowToPay-feesHelpWith"
}

interface ApplicationSolPaymentOptions {
  page: Page;
  accessibility: boolean;
  axeUtil: AxeUtils;
  solicitorPayment: SolicitorPayment;
}

export class ApplicationSolPaymentPage {
  public static async applicationSolPaymentPage({
    page,
    accessibility,
    axeUtil,
    solicitorPayment
  }: ApplicationSolPaymentOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
    });
    await this.fillInFields({
      page: page,
      solicitorPayment
    });
    if (accessibility) {
      await axeUtil.audit()
    }
  }

  private static async checkPageLoads({
    page,
  }: Partial<ApplicationSolPaymentOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.locator(`${Selectors.GovukHeadingL}:text-is("${ApplicationSolPaymentContent.pageTitle}")`).waitFor();

    const headings = [
      ApplicationSolPaymentContent.formLabel1,
      ApplicationSolPaymentContent.formLabel2,
      ApplicationSolPaymentContent.formLabel3,
    ];

    for (const text of headings) {
      const locator = page.locator(`${Selectors.GovukFormLabel}:text-is("${text}")`);
      await expect(locator).toBeVisible();
    }

    const strong = page.locator(`${Selectors.strong}:text-is("${CommonContent.fee}")`);
    const div = page.locator(`${Selectors.div}:text-is("${ApplicationSolPaymentContent.div}")`);
    const td = page.locator(`${Selectors.td}:text-is("${ApplicationSolPaymentContent.td}")`);

    await Promise.all([
      expect(strong).toBeVisible(),
      expect(div).toBeVisible(),
      expect(td).toBeVisible(),
    ]);

  }

  private static async fillInFields({
    page,
    solicitorPayment
  }:Partial<ApplicationSolPaymentOptions>): Promise<void> {
    await page?.click(solicitorPayment as string);
    await page?.click(`${Selectors.button}:text-is("${CommonContent.continue}")`);
  }
}
