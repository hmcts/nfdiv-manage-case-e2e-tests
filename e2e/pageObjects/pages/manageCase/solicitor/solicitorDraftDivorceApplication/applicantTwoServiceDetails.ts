import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

const respondentEmail = "pwapplicant2testingsolcase12345@mailinator.com";
const postcode = "SW1H 9AJ";

export class ApplicantTwoServiceDetailsPage extends BaseJourneyPage {
  private readonly representedNo: Locator;
  private readonly heading: Locator;
  private readonly emailInput: Locator;
  private readonly postcodeInput: Locator;
  private readonly findAddressButton: Locator;
  private readonly addressList: Locator;
  private readonly overseasNo: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.representedNo = page.getByRole("radio", { name: "No" });
    this.heading = page.getByRole("heading", {
      name: "Respondent service details"
    });
    this.emailInput = page.getByRole("textbox", { name: "Respondent email address (Optional)" });
    this.postcodeInput = page.getByRole("textbox", { name: "Enter a UK postcode" });
    this.findAddressButton = page.getByRole("button", {
      name: CommonContent.findAddressButton
    });
    this.addressList = page.getByRole("combobox", { name: "Select an address" });
    this.overseasNo = page.locator("#applicant2AddressOverseas_No"); 
  }

  public async applicantTwoServiceDetails(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.representedNo.check();
    await this.heading.waitFor();
    await this.emailInput.fill(respondentEmail);
    await this.postcodeInput.fill(postcode);
    await this.findAddressButton.click();
    await this.addressList.waitFor();
    await this.addressList.selectOption({ value: "2: Object" });
    await this.overseasNo.check();
    await this.clickContinue();
  }
}
