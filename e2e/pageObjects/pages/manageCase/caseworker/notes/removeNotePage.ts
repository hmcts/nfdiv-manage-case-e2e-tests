import { Page, type Locator } from "@playwright/test";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class RemoveNotePage extends BaseJourneyPage {
  private readonly removeNoteButton: Locator;
  private readonly removeNoteConfirmationButton: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.removeNoteButton = page.getByRole("button", {
      name: "Remove notes",
    });
    this.removeNoteConfirmationButton = page.getByRole("button", {
      name: "Remove",
      exact: true,
    });
    this.submitButton = page.getByRole("button", {
      name: "Submit",
      exact: true,
    });
  }

  public async caseworkerRemoveNote(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.page
      .getByRole("heading", { name: "Remove case note", exact: true })
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.removeNoteButton.click();
    await this.removeNoteConfirmationButton.click();
    await this.submitButton.click();
  }
}
