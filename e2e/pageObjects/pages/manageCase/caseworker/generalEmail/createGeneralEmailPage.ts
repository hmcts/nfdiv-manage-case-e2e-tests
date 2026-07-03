import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
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
    const HEADING_TEXT = "Create general email";
    
    await this.page
      .locator(`${Selectors.GovukHeadingL}:text-is("${HEADING_TEXT}")`,)
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
