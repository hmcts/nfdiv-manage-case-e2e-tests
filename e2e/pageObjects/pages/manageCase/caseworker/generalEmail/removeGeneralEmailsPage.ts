import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class RemoveGeneralEmailsPage extends BaseJourneyPage {
  private readonly removeEmailButton: Locator;
  private readonly removeEmailConfirmationButton: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.removeEmailButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.removeButton}")`,
    );
    this.removeEmailConfirmationButton = page.locator(
      `${Selectors.ConfirmationButton}:text-is("${CommonContent.removeButton}")`
    );
    this.submitButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.submitButton}")`
    );
  }

  public async caseworkerRemoveGeneralEmails(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    const HEADING_TEXT = "Remove general emails";
    
    await this.page
      .locator(`${Selectors.GovukHeadingL}:text-is("${HEADING_TEXT}")`,)
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.removeEmailButton.click();
    await this.removeEmailConfirmationButton.click();
    await this.submitButton.click();
  }
}
