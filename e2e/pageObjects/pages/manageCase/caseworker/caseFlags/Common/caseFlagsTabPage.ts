import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import {Selectors} from "../../../../../../common/selectors.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class CaseFlagsTabPage extends BaseJourneyPage {
  public async assertCaseLevelFlagVisible(flagComment: string): Promise<void> {
    await this.verifyFlags(content.CASE_LEVEL_FLAGS, content.COMPLEX_CASE, flagComment);
  }

  public async assertUpdatedCaseLevelFlagVisible(flagComment: string, flagUpdateReason: string): Promise<void> {
    await this.verifyUpdatedFlags(content.CASE_LEVEL_FLAGS, content.COMPLEX_CASE, flagComment, flagUpdateReason);
  }

  public async assertPartyLevelFlagVisible(flagComment: string): Promise<void> {
    await this.verifyFlags(content.PARTY_LEVEL, content.SCREENING_WITNESS, flagComment);
  }

  public async assertUpdatedPartyLevelFlagVisible(flagComment: string, flagUpdateReason: string): Promise<void> {
    await this.verifyUpdatedFlags(content.PARTY_LEVEL, content.SCREENING_WITNESS, flagComment, flagUpdateReason);
  }

  private async verifyFlags(flagCaption: string, flagType: string, flagComment: string): Promise<void> {
    await this.openCaseFlagsTab();

    await expect(this.page.locator(Selectors.GovukTableCaption).getByText(flagCaption)).toBeVisible({ timeout: 30_000 });

    const row = this.page.locator(Selectors.GovukTableRow)
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagType }) })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagComment }) })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: content.ACTIVE }) });

    await expect(row).toHaveCount(1, { timeout: 30_000 });
    await expect(row).toBeVisible({ timeout: 30_000 });
  }

  private async verifyUpdatedFlags(flagCaption: string, flagType: string, flagComment: string, flagUpdateReason: string): Promise<void> {
    await this.openCaseFlagsTab();

    await expect(this.page.locator(Selectors.GovukTableCaption).getByText(flagCaption)).toBeVisible({ timeout: 30_000 });

    const commentWithReasonCell = this.page.locator(Selectors.GovukTableCell)
      .filter({ has: this.page.locator(Selectors.div, { hasText: flagComment }) })
      .filter({ has: this.page.locator(Selectors.span, { hasText: `${content.UPDATE_REASON} ${flagUpdateReason}` }) });

    const row = this.page.locator(Selectors.GovukTableRow)
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagType }) })
      .filter({ has: commentWithReasonCell })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: content.INACTIVE }) });

    await expect(row).toHaveCount(1, { timeout: 30_000 });
    await expect(row).toBeVisible({ timeout: 30_000 });
  }

  private async openCaseFlagsTab(): Promise<void> {
    await this.page.getByText(content.CASE_FLAGS).first().click();
    await expect(this.page.getByRole("heading", { name: content.CASE_FLAGS }).first()).toBeVisible({ timeout: 30_000 });
  }
}

