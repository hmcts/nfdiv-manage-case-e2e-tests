import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { aboutRespondentOrApplicantTwoContent } from "../constants/solicitorDraftDivorceApplicationContent.ts";

export class AboutRespondentOrApplicantTwoPage extends BaseJourneyPage {
  private readonly firstName: Locator;
  private readonly middleName: Locator;
  private readonly lastName: Locator;
  private readonly marriageApplicant2Name: Locator;
  private readonly nameDifferentNo: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.firstName = page.locator(aboutRespondentOrApplicantTwoContent.selectors.textBoxes.applicant2FirstName);
    this.middleName = page.locator(aboutRespondentOrApplicantTwoContent.selectors.textBoxes.applicant2MiddleName);
    this.lastName = page.locator(aboutRespondentOrApplicantTwoContent.selectors.textBoxes.applicant2LastName);
    this.marriageApplicant2Name = page.locator(aboutRespondentOrApplicantTwoContent.selectors.textBoxes.marriageApplicant2Name);
    this.nameDifferentNo = page.locator(
      aboutRespondentOrApplicantTwoContent.selectors.radioButtons.radioButtonApplicant2NameDifferentNo,
    );
  }

  public async aboutRespondentOrApplicantTwo(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.firstName.fill(aboutRespondentOrApplicantTwoContent.content.applicant2FirstName);
    await this.middleName.fill(aboutRespondentOrApplicantTwoContent.content.applicant2MiddleName);
    await this.lastName.fill(aboutRespondentOrApplicantTwoContent.content.applicant2LastName);
    await this.marriageApplicant2Name.fill(aboutRespondentOrApplicantTwoContent.content.marriageApplicant2Name);
    await this.nameDifferentNo.check();
    await this.clickContinue();
  }
}
