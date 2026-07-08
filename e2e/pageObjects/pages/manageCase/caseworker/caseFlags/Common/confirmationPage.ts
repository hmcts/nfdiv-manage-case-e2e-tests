import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { confirmationPageContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class ConfirmationPage extends BaseJourneyPage {
  public async assertSuccess(): Promise<void> {
    await expect(this.page.getByText(content.FLAG_ADDED).first()).toBeVisible({ timeout: 30_000 });
    await this.clickSubmit();
  }

  public async assertManageSuccess(): Promise<void> {
    await expect(this.page.getByText(content.FLAG_UPDATED).first()).toBeVisible({ timeout: 30_000 });
    await this.clickSubmit();
  }
}

