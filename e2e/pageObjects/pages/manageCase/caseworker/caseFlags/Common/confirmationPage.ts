import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { confirmationPageContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class ConfirmationPage extends BaseJourneyPage {
  public async assertSuccess(): Promise<void> {
    const flagAddedRegex = new RegExp(content.FLAG_ADDED, "i")
    await expect(this.page.getByText(flagAddedRegex).first()).toBeVisible({ timeout: 30_000 });
    await this.clickSubmit();
  }

  public async assertManageSuccess(): Promise<void> {
    const flagUpdatedRegex = new RegExp(content.FLAG_UPDATED, "i")
    await expect(this.page.getByText(flagUpdatedRegex).first()).toBeVisible({ timeout: 30_000 });
    await this.clickSubmit();
  }
}

