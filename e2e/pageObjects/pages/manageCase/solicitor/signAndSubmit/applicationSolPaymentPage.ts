import {Page, expect} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {
  ApplicationSolPaymentContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolPaymentContent.ts";

enum RadioButtons {
  PBA = "#solPaymentHowToPay-feePayByAccount",
  HWF = "#solPaymentHowToPay-feesHelpWith"
}

export type paymentMethod = "PBA" | "HWF";

interface ApplicationSolPaymentOptions {
  page: Page;
  solicitorPayment: paymentMethod;
}

export class ApplicationSolPaymentPage {
  public static async applicationSolPaymentPage({
    page,
    solicitorPayment
  }: ApplicationSolPaymentOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
    });
    await this.fillInFields({
      page: page,
      solicitorPayment
    });
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

    const strong = page.locator(`${Selectors.strong}:text-is("${ApplicationSolPaymentContent.price}")`);
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
  }: ApplicationSolPaymentOptions): Promise<void> {
    if (solicitorPayment === "PBA") {
      await page.click(RadioButtons.PBA)
    } else if (solicitorPayment === "HWF") {
      await page.click(RadioButtons.HWF)
    } else {
      throw new Error("Please select a solicitor payment method")
    }
  }
}
