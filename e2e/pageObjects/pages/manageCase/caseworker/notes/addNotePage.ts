import { Page, type Locator } from "@playwright/test";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { CommonContent } from "../../../../../common/commonContent";

export class AddNotePage extends BaseJourneyPage {
  private readonly noteInput: Locator;

  constructor(page: Page) {
    super(page);
    this.noteInput = page.locator("#note");
  }

  public async caseworkerAddNote(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.page
      .getByRole("heading", { name: "Add case notes", exact: true })
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.noteInput.fill("dummy case note");
    await this.clickButton(CommonContent.submitButton);
  }
}
