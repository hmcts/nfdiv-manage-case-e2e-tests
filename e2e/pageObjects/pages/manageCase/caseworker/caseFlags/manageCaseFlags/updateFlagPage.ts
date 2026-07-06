import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { updateFlagPageContent as content} from "../../constants/caseworkerCaseFlagsContent.ts";

export class updateFlagPage extends BaseJourneyPage {
  public async setFlagInactive(reason: string): Promise<void> {
    const inactiveRegex = new RegExp(`^${content.INACTIVE}$`, "i");
    await this.page.getByRole("radio", { name: inactiveRegex }).first().check();
    const commentInput = this.page.locator(content.selectors.textarea.flagStatusReasonChange);
    await expect(commentInput).toBeVisible({ timeout: 15_000 });
    await commentInput.fill(reason.slice(0, 180));
    await this.clickSubmit();
  }
}

