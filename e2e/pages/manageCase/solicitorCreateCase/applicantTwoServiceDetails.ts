import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";
import {CommonContent} from "../../../fixtures/CommonContent.ts";

enum InputFieldElementIds {
  applicant2Email = '#applicant2Email',
  applicant2Postcode = '#applicant2NonConfidentialAddress_applicant2NonConfidentialAddress_postcodeInput',
}

enum RadioButtonElementIds {
  applicant2SolicitorRepresentedNo = '#applicant2SolicitorRepresented_No',
  applicant2AddressOverseasNo = '#applicant2AddressOverseas_No',
}

enum SelectOptionsElementIds {
  addressList = '#applicant2NonConfidentialAddress_applicant2NonConfidentialAddress_addressList',
}

export class ApplicantTwoServiceDetailsPage {

  public static async applicantTwoServiceDetails(
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

    await page.locator(RadioButtonElementIds.applicant2SolicitorRepresentedNo).check();
    await page.locator('h1:text("Respondent service details")').waitFor();

    const textFields: { elementId: string, fieldValue: string }[] = [
      {elementId: InputFieldElementIds.applicant2Email, fieldValue: AboutApplicants.applicant2Email},
      {elementId: InputFieldElementIds.applicant2Postcode, fieldValue: AboutApplicants.applicant2Postcode},
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.findAddressButton}")`,
    );

    await page.locator(SelectOptionsElementIds.addressList).waitFor();
    await page.selectOption(SelectOptionsElementIds.addressList, {value: '1: Object'});
    await page.locator(RadioButtonElementIds.applicant2AddressOverseasNo).check();

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.continueButton}")`,
    );
  }
}
