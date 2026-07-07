import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonContent } from "../../../../../common/commonContent";
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
    this.removeNoteConfirmationButton = page.locator(
      `${Selectors.ConfirmationButton}:text-is("${CommonContent.removeButton}")`
    );
    this.submitButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.submitButton}")`
    );
  }

  public async caseworkerRemoveNote(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    const HEADING_TEXT = "Remove case note";

    await this.page
      .locator(`${Selectors.GovukHeadingL}:text-is("${HEADING_TEXT}")`)
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.removeNoteButton.click();
    await this.removeNoteConfirmationButton.click();
    await this.submitButton.click();
  }
}
