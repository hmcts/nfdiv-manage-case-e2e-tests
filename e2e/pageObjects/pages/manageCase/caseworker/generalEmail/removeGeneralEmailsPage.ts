import { Page, type Locator } from "@playwright/test";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class RemoveGeneralEmailsPage extends BaseJourneyPage {
  private readonly removeEmailButton: Locator;
  private readonly removeEmailConfirmationButton: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.removeEmailButton = page.getByRole('button', {
      name: 'Remove General emails',
    });
    this.removeEmailConfirmationButton = page.getByRole("button", {
      name: "Remove",
      exact: true,
    });
    this.submitButton = page.getByRole("button", {
      name: "Submit",
      exact: true,
    });
  }

  public async caseworkerRemoveGeneralEmails(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.page
      .getByRole("heading", { name: "Remove general emails", exact: true })
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.removeEmailButton.click();
    await this.removeEmailConfirmationButton.click();
    await this.submitButton.click();
  }
}
