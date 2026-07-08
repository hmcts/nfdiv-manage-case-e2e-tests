import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
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
      .locator(`${Selectors.CaseViewerTab}:text-is("Notes")`)
      .click();
  }

  private async checkNotePresent(): Promise<void> {
    await expect(
      this.page.locator(`${Selectors.GovukText16}:text-is("Notes 1")`)
    ).toHaveCount(1);
  }

  private async checkNoteNotPresent(): Promise<void> {
    await expect(
      this.page.locator(`${Selectors.GovukText16}:text-is("Notes 1")`)
    ).toHaveCount(0);
  }
}
