import {Page} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {AboutApplicantsContent} from "../../../../content/manageCases/solicitor/solicitorCreateCase/aboutApplicantsContent.ts";
import {CommonContent} from "../../../../content/CommonContent.ts";

enum InputFieldElementIds {
  marriageDateDay = '#marriageDate-day',
  marriageDateMonth = '#marriageDate-month',
  marriageDateYear = '#marriageDate-year',
  marriageApplicant1Name = '#marriageApplicant1Name',
  marriageApplicant2Name = '#marriageApplicant2Name',
}

enum RadioButtonElementIds {
  marriageMarriedInUkYes = '#marriageMarriedInUk_Yes',
}

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
    await page.locator(`${Selectors.GovukHeadingL}:text-is("${CommonContent.pageTitle}")`,).waitFor();
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    const marriageDate: string[] = AboutApplicantsContent.marriageDate.split('/');
    const textFields: { elementId: string, fieldValue: string }[] = [
      {elementId: InputFieldElementIds.marriageDateDay, fieldValue: marriageDate[0]},
      {elementId: InputFieldElementIds.marriageDateMonth, fieldValue: marriageDate[1]},
      {elementId: InputFieldElementIds.marriageDateYear, fieldValue: marriageDate[2]},
      {elementId: InputFieldElementIds.marriageApplicant1Name, fieldValue: AboutApplicantsContent.marriageApplicant1Name},
      {elementId: InputFieldElementIds.marriageApplicant2Name, fieldValue: AboutApplicantsContent.marriageApplicant2Name},
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }

    await page.locator(RadioButtonElementIds.marriageMarriedInUkYes).check();

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.continueButton}")`,
    );
  }
}
