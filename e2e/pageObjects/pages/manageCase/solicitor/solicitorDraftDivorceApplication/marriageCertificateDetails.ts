import {Page} from "@playwright/test";
import {Selectors} from "../../../../../common/selectors.ts";
import {AboutApplicantsContent} from "../../../../content/manageCases/solicitor/solicitorCreateCase/aboutApplicantsContent.ts";
import {CommonContent} from "../../../../content/CommonContent.ts";

enum InputFieldElementIds {
  marriageDateDay = '#marriageDate-day',
  marriageDateMonth = '#marriageDate-month',
  marriageDateYear = '#marriageDate-year',
}

enum RadioButtonElementIds {
  marriageMarriedInUkYes = 'label[for="marriageMarriedInUk_Yes"]',
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
    await page.locator(`${Selectors.GovukCaptionL}:text-is("${CommonContent.pageTitle}")`,).waitFor();
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    const marriageDate: string[] = AboutApplicantsContent.marriageDate.split('/');
    const textFields: { elementId: string, fieldValue: string }[] = [
      {elementId: InputFieldElementIds.marriageDateDay, fieldValue: marriageDate[0]},
      {elementId: InputFieldElementIds.marriageDateMonth, fieldValue: marriageDate[1]},
      {elementId: InputFieldElementIds.marriageDateYear, fieldValue: marriageDate[2]},
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }

    // I was getting issue with clicking the radio button.
    // AI suggested changing to this which works
    await page.click(RadioButtonElementIds.marriageMarriedInUkYes);
    await page.click('text="Yes"');

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.continueButton}")`,
    );
  }
}
