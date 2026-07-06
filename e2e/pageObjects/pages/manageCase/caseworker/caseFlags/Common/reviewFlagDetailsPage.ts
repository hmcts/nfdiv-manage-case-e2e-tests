import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { reviewFlagDetailsContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class ReviewFlagDetailsPage extends BaseJourneyPage {
  public async reviewAndSubmitCaseLevel(comment: string): Promise<void> {
    await this.reviewFlag(content.ADD_FLAG_TO, content.CASE_LEVEL, content.COMPLEX_CASE, comment, content.ACTIVE);
    await this.clickSubmit();
  }

  public async reviewAndSubmitManageCaseLevel(comment: string): Promise<void> {
    await this.reviewFlag(content.UPDATE_FLAG_FOR, content.CASE_LEVEL, content.COMPLEX_CASE, comment, content.INACTIVE);
    await this.clickSubmit();
  }

  public async reviewAndSubmitPartyLevel(comment: string): Promise<void> {
    await this.reviewFlag(content.ADD_FLAG_TO, content.PARTY_LEVEL, content.SCREENING_WITNESS, comment, content.ACTIVE);
    await this.clickSubmit();
  }

  public async reviewAndSubmitManagePartyLevel(comment: string): Promise<void> {
    await this.reviewFlag(content.UPDATE_FLAG_FOR, content.PARTY_LEVEL, content.SCREENING_WITNESS, comment, content.INACTIVE);
    await this.clickSubmit();
  }

  private async reviewFlag(levelKey: string, level: string, type: string, comment: string, status: string): Promise<void> {
    await this.fieldMatcher(levelKey, level);
    await this.fieldMatcher(content.FLAG_TYPE, type);
    await this.fieldMatcher(content.COMMENTS, comment);
    await this.fieldMatcher(content.STATUS, status);
  }

  private async fieldMatcher(key: string, value: string): Promise<void> {
    const matchedRows = this.page
      .locator(Selectors.GovukSummaryListRow)
      .filter({ hasText: key })
      .filter({ hasText: value });

    await expect(matchedRows).toHaveCount(1, { timeout: 30_000 });
    await expect(matchedRows).toBeVisible({ timeout: 30_000 });
  }
}
