import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

const respondentDetails = {
  firstName: "ApplicantTwo First",
  middleName: "ApplicantTwo Middle",
  lastName: "ApplicantTwo Last",
  marriageName: "ApplicantTwo Middle Last",
} as const;

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
    await this.assertPageCaption(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.firstName.fill(respondentDetails.firstName);
    await this.middleName.fill(respondentDetails.middleName);
    await this.lastName.fill(respondentDetails.lastName);
    await this.marriageRespondentName.fill(respondentDetails.marriageName);
    await this.nameDifferentNo.check();
    await this.clickContinue();
  }
}
