import {Page, expect} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {CommonContent} from "../../../../../common/commonContent.ts";
import {
  ApplicationSolPayAccountContent
} from "../../../../content/manageCases/solicitor/signAndSubmit/applicationSolPayAccountContent.ts";

enum UniqueSelectors {
  accountNumberSelectOption = "#pbaNumbers",
  paymentReferenceTextBox = "#feeAccountReference"
}

interface ApplicationSolPayAccountOptions {
  page: Page;
}

export class ApplicationSolPayAccountPage {
  public static async applicationSolPayAccountPage({
                                                  page,
                                                }: ApplicationSolPayAccountOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
    });
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
                                        page,
                                      }: Partial<ApplicationSolPayAccountOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.locator(`${Selectors.GovukHeadingL}:text-is("${ApplicationSolPayAccountContent.pageTitle}")`).waitFor();

    const headings = [
      ApplicationSolPayAccountContent.formLabel1,
      ApplicationSolPayAccountContent.formLabel2,

    ];

    for (const text of headings) {
      const locator = page.locator(`${Selectors.GovukFormLabel}:text-is("${text}")`);
      await expect(locator).toBeVisible();
    }

    const formHint = page.locator(`${Selectors.GovukFormHint}:text-is("${ApplicationSolPayAccountContent.formHint}")`);
    await expect(formHint).toBeVisible();

  }

  private static async fillInFields({
                                      page,
                                    }: ApplicationSolPayAccountOptions): Promise<void> {
    await page.selectOption(UniqueSelectors.accountNumberSelectOption, ApplicationSolPayAccountContent.pbaNumber);
    await page.fill(UniqueSelectors.paymentReferenceTextBox, ApplicationSolPayAccountContent.reference);
    await page.click(`${Selectors.button}:text-is("${CommonContent.continue}")`);
  }
}
