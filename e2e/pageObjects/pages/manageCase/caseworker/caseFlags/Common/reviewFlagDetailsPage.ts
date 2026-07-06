import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { Selectors } from "../../../../../../common/selectors.ts";

const ADD_FLAG_TO = "Add flag to";
const UPDATE_FLAG_FOR = "Update flag for";
const FLAG_TYPE = "Flag type";
const COMMENTS = "Comments";
const STATUS = "Status";

export class ReviewFlagDetailsPage extends BaseJourneyPage {
  public async reviewAndSubmitCaseLevel(comment: string): Promise<void> {
    await this.reviewFlag(ADD_FLAG_TO,"Case level", "Complex Case", comment, "Active");
    await this.clickSubmit();
  }

  public async reviewAndSubmitManageCaseLevel(comment: string): Promise<void> {
    await this.reviewFlag(UPDATE_FLAG_FOR, "Case level", "Complex Case", comment, "Inactive");
    await this.clickSubmit();
  }

  public async reviewAndSubmitPartyLevel(comment: string): Promise<void> {
    await this.reviewFlag(ADD_FLAG_TO, "Test your name Test your last name", "Screening witness from accused", comment, "Active");
    await this.clickSubmit();
  }

  public async reviewAndSubmitManagePartyLevel(comment: string): Promise<void> {
    await this.reviewFlag(UPDATE_FLAG_FOR, "Test your name Test your last name", "Screening witness from accused", comment, "Inactive");
    await this.clickSubmit();
  }

  private async reviewFlag(levelKey: string, level: string, type: string, comment: string, status: string): Promise<void> {
    await this.fieldMatcher(levelKey, level);
    await this.fieldMatcher(FLAG_TYPE, type);
    await this.fieldMatcher(COMMENTS, comment);
    await this.fieldMatcher(STATUS, status);
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
