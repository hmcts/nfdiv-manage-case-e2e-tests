import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { confirmationPageContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class ConfirmationPage extends BaseJourneyPage {
  public async assertSuccess(): Promise<void> {
    await this.page.waitForLoadState("load");
    await expect(this.page.getByText(content.flagAdded).first()).toBeVisible({ timeout: 30_000 });
    await this.clickButton(content.closeAndReturn);
  }

  public async assertManageSuccess(): Promise<void> {
    await this.page.waitForLoadState("load");
    await expect(this.page.getByText(content.flagUpdated).first()).toBeVisible({ timeout: 30_000 });
    await this.clickButton(content.closeAndReturn);
  }
}

