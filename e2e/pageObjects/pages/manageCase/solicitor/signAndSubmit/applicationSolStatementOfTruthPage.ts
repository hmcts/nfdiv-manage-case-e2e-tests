import { Page, type Locator } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { CommonContent } from "../../../../../common/commonContent";
export class ApplicationSolStatementOfTruthPage extends BaseJourneyPage {
  private readonly solUrgentCaseNo: Locator;
  private readonly serviceMethodCourt: Locator;
  private readonly statementOfRecYes: Locator;
  private readonly discussedRecYes: Locator;
  private readonly dissolveDivorceYes: Locator;
  private readonly statementOfTruthYes: Locator;
  private readonly solAuthorisedYes: Locator;
  private readonly nameInput: Locator;
  private readonly firmInput: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.solUrgentCaseNo = page.getByRole("group", { name: "Does this case require urgent issue due to jurisdiction or other financial matters?" })
      .getByRole("radio", { name: "No" });
    this.serviceMethodCourt = page.getByRole("radio", { name: "Court Service" });
    this.statementOfRecYes = page.getByRole("group", { name: "I have discussed the possibility of a reconciliation with the applicant." })
      .getByRole("radio", { name: "Yes" });
    this.discussedRecYes = page.getByRole("group", { name: "I have given the applicant the names and addresses of persons qualified to help effect a reconciliation." })
      .getByRole("radio", { name: "Yes" });
    this.dissolveDivorceYes = page.getByRole("checkbox", { name: "I confirm the applicant is applying to the court to dissolve their marriage (get a divorce)" });
    this.statementOfTruthYes = page.getByRole("group", { name: "The applicant believes that the facts stated in this application are true." })
      .getByRole("radio", { name: "Yes" });
    this.solAuthorisedYes = page.getByRole("group", { name: "I am duly authorised by the applicant to sign this statement." })
      .getByRole("radio", { name: "Yes" });
    this.nameInput = page.getByRole("textbox", { name: "Your name" });
    this.firmInput = page.getByRole("textbox", { name: "Name of your firm" });
  }

  public async applicationSolStatementOfTruthPage({
    accessibility,
    axeUtil,
  }: AccessibilityOptions): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
    if (accessibility) {
      await axeUtil.audit();
    }
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.solSignAndSubmitPageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.solUrgentCaseNo.click();
    await this.serviceMethodCourt.click();
    await this.statementOfRecYes.click();
    await this.discussedRecYes.click();
    await this.dissolveDivorceYes.click();
    await this.statementOfTruthYes.click();
    await this.solAuthorisedYes.click();
    await this.nameInput.fill("Solicitor_app_test");
    await this.firmInput.fill("NFD Solicitor Firm");
    await this.clickContinue();
  }
}
