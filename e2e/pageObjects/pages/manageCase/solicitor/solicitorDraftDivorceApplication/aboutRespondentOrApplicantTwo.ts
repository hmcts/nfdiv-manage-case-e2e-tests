import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
export class AboutRespondentOrApplicantTwoPage extends BaseJourneyPage {
  private readonly firstName: Locator;
  private readonly middleName: Locator;
  private readonly lastName: Locator;
  private readonly marriageRespondentName: Locator;
  private readonly nameDifferentNo: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.firstName = page.getByRole("textbox", { name: "Respondent's first name" });
    this.middleName = page.getByRole("textbox", { name: "Respondent's middle name (Optional)" });
    this.lastName = page.getByRole("textbox", { name: "Respondent's last name" });
    this.marriageRespondentName = page.getByRole("textbox", { name: "Respondent's full name" });
    this.nameDifferentNo = page.getByRole("radio", { name: "No" });
  }

  public async aboutRespondentOrApplicantTwo(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.solApplyPageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.firstName.fill(CommonContent.respFirstName);
    await this.middleName.fill(CommonContent.respMiddleName);
    await this.lastName.fill(CommonContent.respLastName);
    await this.marriageRespondentName.fill(CommonContent.respMarriageName);
    await this.nameDifferentNo.check();
    await this.clickContinue();
  }
}
