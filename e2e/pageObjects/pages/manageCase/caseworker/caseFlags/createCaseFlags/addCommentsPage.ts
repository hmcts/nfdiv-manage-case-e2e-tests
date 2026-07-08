import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { addCommentsContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class AddCommentsPage extends BaseJourneyPage {
  public async addFlagComment(comment: string): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.page.locator(content.selectors.textarea.flagComments).fill(comment);
    await this.clickContinue()
  }
}

