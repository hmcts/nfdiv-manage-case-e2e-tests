import {Page} from "@playwright/test";
import {Selectors} from "../../../../common/selectors.ts";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";
import {CommonContent} from "../../../fixtures/CommonContent.ts";

enum InputFieldElementIds {
  applicant1SolicitorName = '#applicant1SolicitorName',
  applicant1SolicitorReference = '#applicant1SolicitorReference',
  applicant1SolicitorPhone = '#applicant1SolicitorPhone',
  applicant1SolicitorEmail = '#applicant1SolicitorEmail',
  searchOrgText = '#search-org-text',
}

enum RadioButtonElementIds {
  applicant1SolicitorAgreeToReceiveEmailsCheckboxYes = '#applicant1SolicitorAgreeToReceiveEmailsCheckbox-Yes',
}

export class SolAboutTheSolicitorPage {

  public static async solAboutTheSolicitor(
    page: Page,
  ): Promise<void> {

    await this.checkPageLoads(page);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
  ): Promise<void> {
    await page.locator(`${Selectors.GovukHeadingL}:text-is("${SolAboutTheSolicitor.pageTitle}")`,).waitFor();
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    type FillData = { selector: string, input: string };
    const fillDataArray: FillData[] = [
      {selector: InputFieldElementIds.applicant1SolicitorName, input: SolAboutTheSolicitor.solicitorName},
      {selector: InputFieldElementIds.applicant1SolicitorReference, input: SolAboutTheSolicitor.solicitorReference},
      {selector: InputFieldElementIds.applicant1SolicitorPhone, input: SolAboutTheSolicitor.solicitorPhone},
      {selector: InputFieldElementIds.applicant1SolicitorEmail, input: process.env.SOLICITOR_USERNAME as string},
      {selector: InputFieldElementIds.searchOrgText, input: SolAboutTheSolicitor.solicitorOrganisation}
    ];

    for (const fillData of fillDataArray) {
      await page.fill(fillData.selector, fillData.input);
    }

    await page.locator(RadioButtonElementIds.applicant1SolicitorAgreeToReceiveEmailsCheckboxYes).check();
    await page.locator('#organisation-table').nth(0).waitFor();
    await page.click(`a[title="Select the organisation ${SolAboutTheSolicitor.solicitorOrganisation}"]`);

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.continueButton}")`,
    );
  }
}
