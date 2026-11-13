import { Page, expect } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class CorrespondenceTab extends BaseJourneyPage {
  constructor(page: Page) {
    super(page);
  }

  public async viewEmailInTab(): Promise<void> {
    await this.clickIntoTab();
    await this.checkEmailPresent();
  }

  public async viewEmptyTab(): Promise<void> {
    await this.clickIntoTab();
    await this.checkEmailNotPresent();
  }

  private async clickIntoTab(): Promise<void> {
    await this.page
      .getByRole("tab", {
        name: CommonContent.correspondenceTab,
        exact: true,
      })
      .click();
  }

  private async checkEmailPresent(): Promise<void> {
    await expect(this.page.getByText("General emails 1", { exact: true })).toHaveCount(1);
  }

  private async checkEmailNotPresent(): Promise<void> {
    await expect(this.page.getByText("General emails 1", { exact: true })).toHaveCount(0);
  }
}
