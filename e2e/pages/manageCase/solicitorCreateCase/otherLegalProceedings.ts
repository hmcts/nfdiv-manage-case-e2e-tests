import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {CommonContent} from "../../../fixtures/CommonContent.ts";

enum RadioButtonElementIds {
  applicant1LegalProceedingsNo = '#applicant1LegalProceedings_No',
}

export class OtherLegalProceedingsPage {

  public static async otherLegalProceedings(
    page: Page,
  ): Promise<void> {

    await this.checkPageLoads(page);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukCaptionL}:text-is("${CommonContent.pageTitle}")`,
    );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    await page.locator(RadioButtonElementIds.applicant1LegalProceedingsNo).check();

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.continueButton}")`,
    );
  }
}
