import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
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
      .locator(`${Selectors.CaseViewerTab}:text-is("${CommonContent.correspondenceTab}")`)
      .click();
  }

  private async checkEmailPresent(): Promise<void> {
    await expect(
      this.page.locator(`${Selectors.GovukText16}:text-is("General emails 1")`)
    ).toHaveCount(1);
  }

  private async checkEmailNotPresent(): Promise<void> {
    await expect(
      this.page.locator(`${Selectors.GovukText16}:text-is("General emails 1")`)
    ).toHaveCount(0);
  }
}
