import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
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
    const HEADING_TEXT = "Add case notes";

    await this.page
      .locator(`${Selectors.GovukHeadingL}:text-is("${HEADING_TEXT}")`)
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.noteInput.fill("dummy case note");
    await this.clickButton(CommonContent.submitButton);
  }
}
