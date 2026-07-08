import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { addCommentsContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class AddCommentsPage extends BaseJourneyPage {
  public async addFlagComment(comment: string): Promise<void> {
    const commentInput = this.page.locator(content.selectors.textarea.flagComments);
    await expect(commentInput).toBeVisible({ timeout: 15_000 });
    await commentInput.fill(comment.slice(0, 180));
    await this.clickSubmit();
  }

  public async addStatusChangeReason(comment: string): Promise<void> {
    await this.page.getByRole("radio", { name: content.INACTIVE }).first().check();
    const commentInput = this.page.locator(content.selectors.textarea.flagStatusReasonChange);
    await expect(commentInput).toBeVisible({ timeout: 15_000 });
    await commentInput.fill(comment.slice(0, 180));
    await this.clickSubmit();
  }
}

