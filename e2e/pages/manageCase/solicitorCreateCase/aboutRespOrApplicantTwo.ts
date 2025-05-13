import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";

export class AboutRespOrApplicantTwoPage {

  public static async aboutRespondentOrApplicantTwo(
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

    const textFields: { elementId: string, fieldValue: string }[] = [
      {elementId: '#applicant2FirstName', fieldValue: AboutApplicants.applicant2FirstName},
      {elementId: '#applicant2MiddleName', fieldValue: AboutApplicants.applicant2MiddleName},
      {elementId: '#applicant2LastName', fieldValue: AboutApplicants.applicant2LastName},
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }

    await page.locator('#applicant2NameDifferentToMarriageCertificate_No').check();

    await page.click(
      `${Selectors.button}:text-is("${SolAboutTheSolicitor.continueButton}")`,
    );
  }
}
