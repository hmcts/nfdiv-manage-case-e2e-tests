import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { AboutApplicantContent } from "../constants/solicitorDraftDivorceApplicationContent.ts";

export class AboutApplicantPage extends BaseJourneyPage {
  private readonly addressList: Locator;
  private readonly divorceWho: Locator;
  private readonly findAddressButton: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.addressList = page.locator(
      AboutApplicantContent.selectors.dropdowns.addressList,
    );
    this.divorceWho = page.locator(
      AboutApplicantContent.selectors.dropdowns.divorceWho,
    );
    this.findAddressButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.findAddressButton}")`,
    );
  }

  public async aboutApplicant(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    const page = this.page;
    const textFields: { elementId: string; fieldValue: string }[] = [
      {
        elementId:
          AboutApplicantContent.selectors.textBoxes.applicant1FirstName,
        fieldValue: AboutApplicantContent.content.applicant1FirstName,
      },
      {
        elementId:
          AboutApplicantContent.selectors.textBoxes.applicant1MiddleName,
        fieldValue: AboutApplicantContent.content.applicant1MiddleName,
      },
      {
        elementId: AboutApplicantContent.selectors.textBoxes.applicant1LastName,
        fieldValue: AboutApplicantContent.content.applicant1LastName,
      },
      {
        elementId:
          AboutApplicantContent.selectors.textBoxes.marriageApplicant1Name,
        fieldValue: AboutApplicantContent.content.marriageApplicant1Name,
      },
      {
        elementId: AboutApplicantContent.selectors.textBoxes.applicant1Email,
        fieldValue: AboutApplicantContent.content.applicant1Email,
      },
      {
        elementId:
          AboutApplicantContent.selectors.textBoxes.applicant1PhoneNumber,
        fieldValue: AboutApplicantContent.content.applicant1PhoneNumber,
      },
      {
        elementId: AboutApplicantContent.selectors.textBoxes.applicant1Postcode,
        fieldValue: AboutApplicantContent.content.applicantPostcode,
      },
    ];

    for (const textField of textFields) {
      await page.fill(textField.elementId, textField.fieldValue);
    }
    await this.findAddressButton.click();
    await this.addressList.waitFor();
    await this.addressList.selectOption({ value: "2: Object" });
    await this.divorceWho.selectOption({
      value: ["1: husband", "2: wife"][Math.floor(Math.random() * 2)],
    });
    for (const id in AboutApplicantContent.selectors.radioButtons) {
      await page
        .locator(
          AboutApplicantContent.selectors.radioButtons[
            id as keyof typeof AboutApplicantContent.selectors.radioButtons
          ],
        )
        .check();
    }
    await this.clickContinue();
  }
}
