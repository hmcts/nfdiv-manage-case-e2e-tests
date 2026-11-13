import { Page, type Locator } from "@playwright/test";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { config } from "../../../../../config";
import { CommonContent } from "../../../../../common/commonContent";

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
    this.solicitorName = page.getByRole("textbox", { name: "Solicitor’s full name" });
    this.solicitorReference = page.getByRole("textbox", { name: "Solicitor reference (Optional)" });
    this.solicitorPhone = page.getByRole("textbox", { name: "Solicitor’s direct phone number (Optional)" });
    this.solicitorEmail = page.getByRole("textbox", { name: "Solicitor’s email address" });
    this.searchOrgText = page.locator("#search-org-text");
    this.agreeEmailsYes = page.getByRole('checkbox', {
      name: "I confirm I’m willing to accept service of all correspondence and orders by email at the email address above"
    });
    this.organisationTable = page.locator("#organisation-table");
    this.selectOrgLink = page.getByRole("link", { name : "Select" });
  }

  public async solAboutTheSolicitor(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption("Apply: divorce or dissolution");
  }

  private async fillInFields(): Promise<void> {
    await this.solicitorName.fill(CommonContent.solicitorName);
    await this.solicitorReference.fill(CommonContent.solicitorReference);
    await this.solicitorPhone.fill(CommonContent.solicitorPhone);
    await this.solicitorEmail.fill(process.env.E2E_SOLICITOR_USERNAME as string);
    await this.searchOrgText.fill(process.env.E2E_SOLICITOR_ORGANISATION as string);
    await this.agreeEmailsYes.check();
    await this.organisationTable.first().waitFor();
    await this.selectOrgLink.click();
    await this.clickContinue();
  }
}
