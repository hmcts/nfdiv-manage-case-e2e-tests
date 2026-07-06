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

    const flagCaptionRegex = new RegExp(`${flagCaption}`, "i");
    const flagTypeRegex = new RegExp(`${flagType}`, "i");
    await expect(this.page.locator(Selectors.GovukTableCaption).getByText(flagCaptionRegex)).toBeVisible({ timeout: 30_000 });

    const row = this.page.locator(Selectors.GovukTableRow)
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagTypeRegex }) })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagComment }) })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: /^ACTIVE$/i }) });

    await expect(row).toHaveCount(1, { timeout: 30_000 });
    await expect(row).toBeVisible({ timeout: 30_000 });
  }

  private async verifyUpdatedFlags(flagCaption: string, flagType: string, flagComment: string, flagUpdateReason: string): Promise<void> {
    await this.openCaseFlagsTab();

    const flagCaptionRegex = new RegExp(`${flagCaption}`, "i");
    const flagTypeRegex = new RegExp(`${flagType}`, "i");
    const inactiveRegex = new RegExp(`^${content.INACTIVE}$`, "i");
    await expect(this.page.locator(Selectors.GovukTableCaption).getByText(flagCaptionRegex)).toBeVisible({ timeout: 30_000 });

    const commentWithReasonCell = this.page.locator(Selectors.GovukTableCell)
      .filter({ has: this.page.locator(Selectors.div, { hasText: flagComment }) })
      .filter({ has: this.page.locator(Selectors.span, { hasText: `${content.UPDATE_REASON} ${flagUpdateReason}` }) });

    const row = this.page.locator(Selectors.GovukTableRow)
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagTypeRegex }) })
      .filter({ has: commentWithReasonCell })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: inactiveRegex }) });

    await expect(row).toHaveCount(1, { timeout: 30_000 });
    await expect(row).toBeVisible({ timeout: 30_000 });
  }

  private async openCaseFlagsTab(): Promise<void> {
    const caseFlagsRegex = new RegExp(`${content.CASE_FLAGS}`, "i");
    await this.page.getByText(caseFlagsRegex).first().click();
    await expect(this.page.getByRole("heading", { name: caseFlagsRegex }).first()).toBeVisible({ timeout: 30_000 });
  }
}

