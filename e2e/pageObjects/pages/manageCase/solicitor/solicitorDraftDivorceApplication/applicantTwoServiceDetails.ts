import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { ApplicantTwoServiceDetailsContent } from "../constants/solicitorDraftDivorceApplicationContent.ts";

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
    this.representedNo = page.locator(
      ApplicantTwoServiceDetailsContent.selectors.radioButtons
        .applicant2SolicitorRepresentedNo,
    );
    this.heading = page.locator('h1:text("Respondent service details")');
    this.emailInput = page.locator(
      ApplicantTwoServiceDetailsContent.selectors.textBoxes.applicant2Email,
    );
    this.postcodeInput = page.locator(
      ApplicantTwoServiceDetailsContent.selectors.textBoxes.applicant2Postcode,
    );
    this.findAddressButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.findAddressButton}")`,
    );
    this.addressList = page.locator(
      ApplicantTwoServiceDetailsContent.selectors.dropdowns.addressList,
    );
    this.overseasNo = page.locator(
      ApplicantTwoServiceDetailsContent.selectors.radioButtons
        .applicant2AddressOverseasNo,
    );
  }

  public async applicantTwoServiceDetails(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.representedNo.check();
    await this.heading.waitFor();
    await this.emailInput.fill(
      ApplicantTwoServiceDetailsContent.content.applicant2Email,
    );
    await this.postcodeInput.fill(
      ApplicantTwoServiceDetailsContent.content.applicantPostcode,
    );
    await this.findAddressButton.click();
    await this.addressList.waitFor();
    await this.addressList.selectOption({ value: "2: Object" });
    await this.overseasNo.check();
    await this.clickContinue();
  }
}
