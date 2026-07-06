import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";

export class ConfirmationPage extends BaseJourneyPage {
  public async assertSuccess(): Promise<void> {
    await expect(this.page.getByText(/This Flag has been added to case/i).first()).toBeVisible({ timeout: 30_000 });
    await this.clickSubmit();
  }

  public async assertManageSuccess(): Promise<void> {
    await expect(this.page.getByText(/Flag updated/i).first()).toBeVisible({ timeout: 30_000 });
    await this.clickSubmit();
  }
}

