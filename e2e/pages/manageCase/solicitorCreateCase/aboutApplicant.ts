import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";

import {
  HowDoYouWantToApplyForDivorce
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/howDoYouWantToApplyForDivorce.ts";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";
import {
  SolicitorCreateCaseStart
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solicitorCreateCaseStart.ts";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";

export class AboutApplicantPage {

  public static async aboutApplicant(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {

    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${AboutApplicants.pageTitle}")`,
    );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    const textFields: { elementId: string, fieldValue: string }[] = [
      {elementId: '#applicant1FirstName', fieldValue: AboutApplicants.applicant1FirstName},
      {elementId: '#applicant1MiddleName', fieldValue: AboutApplicants.applicant1MiddleName},
      {elementId: '#applicant1LastName', fieldValue: AboutApplicants.applicant1LastName},
      {elementId: '#applicant1Email', fieldValue: AboutApplicants.applicant1Email},
      {elementId: '#applicant1PhoneNumber', fieldValue: AboutApplicants.applicant1PhoneNumber},
      {
        elementId: '#applicant1NonConfidentialAddress_applicant1NonConfidentialAddress_postcodeInput',
        fieldValue: AboutApplicants.applicant1Postcode
      },
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }

    await page.click(
      `${Selectors.button}:text-is("${AboutApplicants.findAddressButton}")`,
    );

    await page.waitForSelector('#applicant1NonConfidentialAddress_applicant1NonConfidentialAddress_addressList');
    await page.selectOption('#applicant1NonConfidentialAddress_applicant1NonConfidentialAddress_addressList', {value: '1: Object'});
    await page.selectOption('#divorceWho', {value: ['1: husband', '2: wife'][Math.floor(Math.random() * 2)]});

    for (const elementId of ['#applicant1NameDifferentToMarriageCertificate_No',
      '#marriageFormationType-oppositeSexCouple',
      '#applicant1AddressOverseas_No',
      '#applicant1ContactDetailsType-public']) {
      await page.locator(elementId).check();
    }

    const button = page.locator(`${Selectors.button}:text-is("${SolAboutTheSolicitor.continueButton}")`);
    await button.scrollIntoViewIfNeeded();
    await button.click();
  }
}
