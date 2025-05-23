import {Page} from "@playwright/test";
import {Selectors} from "../../../../common/selectors.ts";
import {AboutApplicantsContent} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicantsContent.ts";
import {CommonContent} from "../../../fixtures/CommonContent.ts";

enum InputFieldElementIds {
  applicant2FirstName = '#applicant2FirstName',
  applicant2MiddleName = '#applicant2MiddleName',
  applicant2LastName = '#applicant2LastName',
}

enum RadioButtonElementIds {
  radioButtonApplicant2NameDifferentNo = '#applicant2NameDifferentToMarriageCertificate_No',
}

export class AboutRespondentOrApplicantTwoPage {

  public static async aboutRespondentOrApplicantTwo(
    page: Page,
  ): Promise<void> {

    await this.checkPageLoads(page);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
  ): Promise<void> {
    await page.locator(`${Selectors.GovukCaptionL}:text-is("${CommonContent.pageTitle}")`,).waitFor();
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    const textFields: { elementId: string, fieldValue: string }[] = [
      {elementId: InputFieldElementIds.applicant2FirstName, fieldValue: AboutApplicantsContent.applicant2FirstName},
      {elementId: InputFieldElementIds.applicant2MiddleName, fieldValue: AboutApplicantsContent.applicant2MiddleName},
      {elementId: InputFieldElementIds.applicant2LastName, fieldValue: AboutApplicantsContent.applicant2LastName},
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }

    await page.locator(RadioButtonElementIds.radioButtonApplicant2NameDifferentNo).check();

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.continueButton}")`,
    );
  }
}
