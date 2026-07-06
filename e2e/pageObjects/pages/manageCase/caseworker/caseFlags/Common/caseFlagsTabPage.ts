import { expect } from "@playwright/test";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import {Selectors} from "../../../../../../common/selectors.ts";

export class CaseFlagsTabPage extends BaseJourneyPage {
  public async assertCaseLevelFlagVisible(flagComment: string): Promise<void> {
    await this.verifyFlags("Case level flags", "Complex Case", flagComment);
  }

  public async assertUpdatedCaseLevelFlagVisible(flagComment: string, flagUpdateReason: string): Promise<void> {
    await this.verifyUpdatedFlags("Case level flags", "Complex Case", flagComment, flagUpdateReason);
  }

  public async assertPartyLevelFlagVisible(flagComment: string): Promise<void> {
    await this.verifyFlags("Test your name Test your last name", "Screening witness from accused", flagComment);
  }

  public async assertUpdatedPartyLevelFlagVisible(flagComment: string, flagUpdateReason: string): Promise<void> {
    await this.verifyUpdatedFlags("Test your name Test your last name", "Screening witness from accused", flagComment, flagUpdateReason);
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
    await expect(this.page.locator(Selectors.GovukTableCaption).getByText(flagCaptionRegex)).toBeVisible({ timeout: 30_000 });

    const commentWithReasonCell = this.page.locator(Selectors.GovukTableCell)
      .filter({ has: this.page.locator("div", { hasText: flagComment }) })
      .filter({ has: this.page.locator("span", { hasText: `Update Reason: ${flagUpdateReason}` }) });

    const row = this.page.locator(Selectors.GovukTableRow)
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: flagTypeRegex }) })
      .filter({ has: commentWithReasonCell })
      .filter({ has: this.page.locator(Selectors.GovukTableCell, { hasText: /^INACTIVE$/i }) });

    await expect(row).toHaveCount(1, { timeout: 30_000 });
    await expect(row).toBeVisible({ timeout: 30_000 });
  }

  private async openCaseFlagsTab(): Promise<void> {
    await this.page.getByText(/Case Flags/i).first().click();
    await expect(this.page.getByRole("heading", { name: /Case flags/i }).first()).toBeVisible({ timeout: 30_000 });
  }
}

