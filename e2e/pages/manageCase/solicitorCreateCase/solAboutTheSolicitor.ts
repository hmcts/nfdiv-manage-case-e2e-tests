import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";

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
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${SolAboutTheSolicitor.pageTitle}")`,
      );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    type FillData = { selector: string, input: string };
    const fillDataArray: FillData[] = [
      {selector: '#applicant1SolicitorName', input: SolAboutTheSolicitor.solicitorName},
      {selector: '#applicant1SolicitorReference', input: SolAboutTheSolicitor.solicitorReference},
      {selector: '#applicant1SolicitorPhone', input: SolAboutTheSolicitor.solicitorPhone},
      {selector: '#applicant1SolicitorEmail', input: process.env.SOLICITOR_USERNAME},
      {selector: '#search-org-text', input: SolAboutTheSolicitor.solicitorOrganisation}
    ];

    for (const fillData of fillDataArray) {
      await page.fill(fillData.selector, fillData.input);
    }

    await page.locator('#applicant1SolicitorAgreeToReceiveEmailsCheckbox-Yes').check();
    await page.waitForSelector('#organisation-table');
    await page.click(`a[title="Select the organisation ${SolAboutTheSolicitor.solicitorOrganisation}"]`);

    await page.click(
      `${Selectors.button}:text-is("${SolAboutTheSolicitor.continueButton}")`,
    );
  }
}
