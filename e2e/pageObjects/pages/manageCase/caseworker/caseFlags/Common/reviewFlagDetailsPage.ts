import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { reviewFlagDetailsContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class ReviewFlagDetailsPage extends BaseJourneyPage {
  public async reviewAndSubmitCaseLevel(comment: string): Promise<void> {
    await this.reviewFlag(content.addFlagTo, content.caseLevel, content.complexCase, comment, content.active);
  }

  public async reviewAndSubmitManageCaseLevel(comment: string): Promise<void> {
    await this.reviewFlag(content.updateFlagFor, content.caseLevel, content.complexCase, comment, content.inactive);
  }

  public async reviewAndSubmitPartyLevel(comment: string): Promise<void> {
    await this.reviewFlag(content.addFlagTo, content.partyLevel, content.screeningWitness, comment, content.active);
  }

  public async reviewAndSubmitManagePartyLevel(comment: string): Promise<void> {
    await this.reviewFlag(content.updateFlagFor, content.partyLevel, content.screeningWitness, comment, content.inactive);
  }

  private async reviewFlag(levelKey: string, level: string, type: string, comment: string, status: string): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.fieldMatcher(levelKey, level);
    await this.fieldMatcher(content.flagType, type);
    await this.fieldMatcher(content.comments, comment);
    await this.fieldMatcher(content.status, status);
    await this.clickSaveAndContinue()
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
