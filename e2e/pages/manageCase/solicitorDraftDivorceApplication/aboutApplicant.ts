import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";
import {CommonContent} from "../../../fixtures/CommonContent.ts";

enum InputFieldElementIds {
  applicant1FirstName = '#applicant1FirstName',
  applicant1MiddleName = '#applicant1MiddleName',
  applicant1LastName = '#applicant1LastName',
  applicant1Email = '#applicant1Email',
  applicant1PhoneNumber = '#applicant1PhoneNumber',
  applicant1Postcode = '#applicant1NonConfidentialAddress_applicant1NonConfidentialAddress_postcodeInput',
}

enum RadioButtonElementIds {
  radioButtonApplicant1NameDifferentNo = '#applicant1NameDifferentToMarriageCertificate_No',
  radioButtonMarriageFormationTypeOppositeSexCouple = '#marriageFormationType-oppositeSexCouple',
  radioButtonApplicant1AddressOverseasNo = '#applicant1AddressOverseas_No',
  radioButtonApplicant1ContactDetailsPublic = '#applicant1ContactDetailsType-public'
}

enum SelectOptionsElementIds {
  addressList = '#applicant1NonConfidentialAddress_applicant1NonConfidentialAddress_addressList',
  divorceWho = '#divorceWho',
}

export class AboutApplicantPage {

  public static async aboutApplicant(
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

    const textFields: { elementId: string, fieldValue: string }[] = [
      {elementId: InputFieldElementIds.applicant1FirstName, fieldValue: AboutApplicants.applicant1FirstName},
      {elementId: InputFieldElementIds.applicant1MiddleName, fieldValue: AboutApplicants.applicant1MiddleName},
      {elementId: InputFieldElementIds.applicant1LastName, fieldValue: AboutApplicants.applicant1LastName},
      {elementId: InputFieldElementIds.applicant1Email, fieldValue: AboutApplicants.applicant1Email},
      {elementId: InputFieldElementIds.applicant1PhoneNumber, fieldValue: AboutApplicants.applicant1PhoneNumber},
      {elementId: InputFieldElementIds.applicant1Postcode, fieldValue: AboutApplicants.applicant1Postcode},
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.findAddressButton}")`,
    );

    await page.locator(SelectOptionsElementIds.addressList).waitFor();
    await page.selectOption(SelectOptionsElementIds.addressList, {value: '1: Object'});
    await page.selectOption(SelectOptionsElementIds.divorceWho, {value: ['1: husband', '2: wife'][Math.floor(Math.random() * 2)]});

    for (const id in RadioButtonElementIds) {
      await page.locator(RadioButtonElementIds[id as keyof typeof RadioButtonElementIds]).check();
    }

    await page.click(`${Selectors.button}:text-is("${CommonContent.continueButton}")`);
  }
}
