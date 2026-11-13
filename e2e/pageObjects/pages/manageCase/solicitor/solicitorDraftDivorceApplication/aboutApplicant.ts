import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

const applicantDetails = {
  firstName: "ApplicantOne First",
  middleName: "ApplicantOne Middle",
  lastName: "ApplicantOne Last",
  marriageName: "ApplicantOne Middle Last",
  email: "pwapplicant1testingsolcase67890@mailinator.com",
  phoneNumber: "01234567890",
  postcode: "SW1H 9AJ",
} as const;
export class AboutApplicantPage extends BaseJourneyPage {
  private readonly applicantPostcode: Locator;
  private readonly addressList: Locator;
  private readonly divorceWho: Locator;
  private readonly findAddressButton: Locator;
  private readonly applicantFirstName: Locator;
  private readonly applicantMiddleName: Locator;
  private readonly applicantLastName: Locator;
  private readonly marriageApplicantName: Locator;
  private readonly applicantNameMatches: Locator;
  private readonly applicantSameSex: Locator;
  private readonly applicantConfidential: Locator;
  private readonly applicantEmail: Locator;
  private readonly applicantPhoneNumber: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.applicantPostcode = page.getByRole("textbox", { name: "Enter a UK postcode" });
    this.addressList = page.getByRole("combobox", { name: "Select an address" });
    this.divorceWho = page.getByRole("combobox", { name: "Who is the applicant divorcing?" });
    this.findAddressButton = page.getByRole("button", {
      name: CommonContent.findAddressButton,
    });
    this.applicantFirstName = page.getByRole("textbox", {name: "Applicant's first name"});
    this.applicantMiddleName = page.getByRole("textbox", {name: "Applicant's middle name (Optional)"});
    this.applicantLastName = page.getByRole("textbox", {name: "Applicant's last name"});
    this.applicantNameMatches = page.locator("#applicant1NameDifferentToMarriageCertificate_No");
    this.marriageApplicantName = page.getByRole("textbox", {name: "Applicant's full name"});
    this.applicantSameSex = page.getByRole("radio", { name: "Opposite-sex couple" });
    this.applicantEmail = page.getByRole("textbox", {name: "Applicant's email address"});
    this.applicantPhoneNumber = page.getByRole("textbox", {name: "Applicant's phone number (Optional)"});
    this.applicantConfidential = page.getByRole("radio", {name: "Do not need to keep contact details private"});
  }

  public async aboutApplicant(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.applicantFirstName.fill(applicantDetails.firstName);
    await this.applicantMiddleName.fill(applicantDetails.middleName);
    await this.applicantLastName.fill(applicantDetails.lastName);
    await this.applicantNameMatches.click();
    await this.marriageApplicantName.fill(applicantDetails.marriageName);
      await this.divorceWho.selectOption({
      value: ["1: husband", "2: wife"][Math.floor(Math.random() * 2)],
    });
    await this.applicantSameSex.click();
    await this.applicantEmail.fill(applicantDetails.email);
    await this.applicantPhoneNumber.fill(applicantDetails.phoneNumber);
    await this.applicantPostcode.fill(applicantDetails.postcode);
    await this.findAddressButton.click();
    await this.addressList.waitFor();
    await this.addressList.selectOption({ value: "2: Object" });
    await this.applicantConfidential.click();
    await this.clickContinue();
  }
}
