import { Page, type Locator } from "@playwright/test";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { SolAboutTheSolicitorContent } from "../constants/solicitorDraftDivorceApplicationContent.ts";

export class SolAboutTheSolicitorPage extends BaseJourneyPage {
  private readonly solicitorName: Locator;
  private readonly solicitorReference: Locator;
  private readonly solicitorPhone: Locator;
  private readonly solicitorEmail: Locator;
  private readonly searchOrgText: Locator;
  private readonly agreeEmailsYes: Locator;
  private readonly organisationTable: Locator;
  private readonly selectOrgLink: Locator;

  constructor(page: Page) {
    super(page);
    this.solicitorName = page.locator(
      SolAboutTheSolicitorContent.selectors.textBoxes.applicant1SolicitorName,
    );
    this.solicitorReference = page.locator(
      SolAboutTheSolicitorContent.selectors.textBoxes
        .applicant1SolicitorReference,
    );
    this.solicitorPhone = page.locator(
      SolAboutTheSolicitorContent.selectors.textBoxes.applicant1SolicitorPhone,
    );
    this.solicitorEmail = page.locator(
      SolAboutTheSolicitorContent.selectors.textBoxes.applicant1SolicitorEmail,
    );
    this.searchOrgText = page.locator(
      SolAboutTheSolicitorContent.selectors.textBoxes.searchOrgText,
    );
    this.agreeEmailsYes = page.locator(
      SolAboutTheSolicitorContent.selectors.radioButtons
        .applicant1SolicitorAgreeToReceiveEmailsCheckboxYes,
    );
    this.organisationTable = page.locator("#organisation-table");
    this.selectOrgLink = page.locator(
      `a[title="Select the organisation ${SolAboutTheSolicitorContent.content.solicitorOrganisation}"]`,
    );
  }

  public async solAboutTheSolicitor(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(SolAboutTheSolicitorContent.content.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.solicitorName.fill(
      SolAboutTheSolicitorContent.content.solicitorName,
    );
    await this.solicitorReference.fill(
      SolAboutTheSolicitorContent.content.solicitorReference,
    );
    await this.solicitorPhone.fill(
      SolAboutTheSolicitorContent.content.solicitorPhone,
    );
    await this.solicitorEmail.fill(process.env.SOLICITOR_USERNAME as string);
    await this.searchOrgText.fill(
      SolAboutTheSolicitorContent.content.solicitorOrganisation,
    );
    await this.agreeEmailsYes.check();
    await this.organisationTable.first().waitFor();
    await this.selectOrgLink.click();
    await this.clickContinue();
  }
}
