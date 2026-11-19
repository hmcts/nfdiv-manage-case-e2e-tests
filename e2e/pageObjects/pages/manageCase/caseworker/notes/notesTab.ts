import { Page, expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class NotesTab extends BaseJourneyPage {
  constructor(page: Page) {
    super(page);
  }

  public async viewNoteInTab(): Promise<void> {
    await this.clickIntoTab();
    await this.checkNotePresent();
  }

  public async viewEmptyTab(): Promise<void> {
    await this.clickIntoTab();
    await this.checkNoteNotPresent();
  }

  private async clickIntoTab(): Promise<void> {
    await this.page
      .getByRole("tab", { name: "Notes", exact: true })
      .click();
  }

  private async checkNotePresent(): Promise<void> {
    await expect(this.page.getByText("Notes 1", { exact: true })).toHaveCount(1);
  }

  private async checkNoteNotPresent(): Promise<void> {
    await expect(this.page.getByText("Notes 1", { exact: true })).toHaveCount(0);
  }
}
