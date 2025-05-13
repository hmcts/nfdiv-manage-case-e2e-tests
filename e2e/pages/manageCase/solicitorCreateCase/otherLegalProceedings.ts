import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";

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
      `${Selectors.GovukCaptionL}:text-is("${AboutApplicants.pageTitle}")`,
    );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    await page.locator('#applicant1LegalProceedings_No').check();
    await page.click(
      `${Selectors.button}:text-is("${AboutApplicants.continueButton}")`,
    );
  }
}
