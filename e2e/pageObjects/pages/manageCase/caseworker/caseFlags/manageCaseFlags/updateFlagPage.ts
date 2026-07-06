import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";

export class updateFlagPage extends BaseJourneyPage {
  public async setFlagInactive(reason: string): Promise<void> {
    await this.page.getByRole("radio", { name: /^Inactive$/i }).first().check();
    const commentInput = this.page.locator("#flagStatusReasonChange");
    await expect(commentInput).toBeVisible({ timeout: 15_000 });
    await commentInput.fill(reason.slice(0, 180));
    await this.clickSubmit();
  }
}

