import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";

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
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${AboutApplicants.pageTitle}")`,
    );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    await page.locator('#applicant2SolicitorRepresented_No').check();
    await page.waitForSelector('h1:text("Respondent service details")');

    const textFields: { elementId: string, fieldValue: string }[] = [
      {elementId: '#applicant2Email', fieldValue: AboutApplicants.applicant2Email},
      {
        elementId: '#applicant2NonConfidentialAddress_applicant2NonConfidentialAddress_postcodeInput',
        fieldValue: AboutApplicants.applicant2Postcode
      },
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }

    await page.click(
      `${Selectors.button}:text-is("${AboutApplicants.findAddressButton}")`,
    );

    await page.waitForSelector('#applicant2NonConfidentialAddress_applicant2NonConfidentialAddress_addressList');
    await page.selectOption('#applicant2NonConfidentialAddress_applicant2NonConfidentialAddress_addressList', {value: '1: Object'});
    await page.locator('#applicant2AddressOverseas_No').check();

    await page.click(
      `${Selectors.button}:text-is("${SolAboutTheSolicitor.continueButton}")`,
    );
  }
}
