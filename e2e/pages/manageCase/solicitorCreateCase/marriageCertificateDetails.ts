import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";

export class MarriageCertificateDetailsPage {

  public static async marriageCertificateDetails(
    page: Page,
  ): Promise<void> {

    await this.checkPageLoads(page);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${AboutApplicants.pageTitle}")`,
    );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    const marriageDate: string[] = AboutApplicants.marriageDate.split('/');
    const textFields: { elementId: string, fieldValue: string }[] = [
      {elementId: '#marriageDate-day', fieldValue: marriageDate[0]},
      {elementId: '#marriageDate-month', fieldValue: marriageDate[1]},
      {elementId: '#marriageDate-year', fieldValue: marriageDate[2]},
      {elementId: '#marriageApplicant1Name', fieldValue: AboutApplicants.marriageApplicant1Name},
      {elementId: '#marriageApplicant2Name', fieldValue: AboutApplicants.marriageApplicant2Name},
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }

    await page.locator('#marriageMarriedInUk_Yes').check();

    await page.click(
      `${Selectors.button}:text-is("${SolAboutTheSolicitor.continueButton}")`,
    );
  }
}
