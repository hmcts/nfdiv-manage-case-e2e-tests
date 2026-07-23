import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import {Selectors} from "../../../../../../common/selectors.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class CaseFlagsTabPage extends BaseJourneyPage {
  public async assertCaseLevelFlagVisible(flagComment: string): Promise<void> {
    await this.verifyFlags(content.caseLevelFlags, content.complexCase, flagComment);
  }

  public async assertUpdatedCaseLevelFlagVisible(flagComment: string, flagUpdateReason: string): Promise<void> {
    await this.verifyUpdatedFlags(content.caseLevelFlags, content.complexCase, flagComment, flagUpdateReason);
  }

  public async assertPartyLevelFlagVisible(flagComment: string): Promise<void> {
    await this.verifyFlags(content.partyLevel, content.screeningWitness, flagComment);
  }

  public async assertUpdatedPartyLevelFlagVisible(flagComment: string, flagUpdateReason: string): Promise<void> {
    await this.verifyUpdatedFlags(content.partyLevel, content.screeningWitness, flagComment, flagUpdateReason);
  }

  private async verifyFlags(flagCaption: string, flagType: string, flagComment: string): Promise<void> {
    await this.openCaseFlagsTab();

    await expect(this.page.locator(Selectors.GovukTableCaption).getByText(flagCaption)).toBeVisible({ timeout: 30_000 });

    const row = this.page.locator(Selectors.GovukTableRow)
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagType }) })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagComment }) })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: content.active }) });

    await expect(row).toHaveCount(1, { timeout: 30_000 });
    await expect(row).toBeVisible({ timeout: 30_000 });
  }

  private async verifyUpdatedFlags(flagCaption: string, flagType: string, flagComment: string, flagUpdateReason: string): Promise<void> {
    await this.openCaseFlagsTab();

    await expect(this.page.locator(Selectors.GovukTableCaption).getByText(flagCaption)).toBeVisible({ timeout: 30_000 });

    const commentWithReasonCell = this.page.locator(Selectors.GovukTableCell)
      .filter({ has: this.page.locator(Selectors.div, { hasText: flagComment }) })
      .filter({ has: this.page.locator(Selectors.span, { hasText: `${content.updateReason} ${flagUpdateReason}` }) });

    const row = this.page.locator(Selectors.GovukTableRow)
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagType }) })
      .filter({ has: commentWithReasonCell })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: content.inactive }) });

    await expect(row).toHaveCount(1, { timeout: 30_000 });
    await expect(row).toBeVisible({ timeout: 30_000 });
  }

  private async openCaseFlagsTab(): Promise<void> {
    await this.page.getByText(content.caseFlags).first().click();
    await expect(this.page.getByRole("heading", { name: content.caseFlags }).first()).toBeVisible({ timeout: 30_000 });
  }
}

