import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class CreateGeneralEmailPage extends BaseJourneyPage {
  private readonly emailPartiesSelect: Locator;
  private readonly emailDetailsInput: Locator;

  constructor(page: Page) {
    super(page);
    this.emailPartiesSelect = page.locator("#generalEmailParties");
    this.emailDetailsInput = page.locator("#generalEmailDetails");
  }

  public async caseworkerCreateGeneralEmail(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.page
      .getByRole("heading", { name: "Create general email", exact: true })
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.emailPartiesSelect.selectOption(
      CommonContent.applicantOrApplicantSolicitorOption,
    );

    await this.emailDetailsInput.fill("dummy email content");

    await this.clickContinue();
  }
}
