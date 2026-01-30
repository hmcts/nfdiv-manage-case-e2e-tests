import { Page } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";

export class JurisdictionApplyForDivorceOrDissolutionPage extends BaseJourneyPage {
  constructor(page: Page) {
    super(page);
  }

  public async jurisdictionConnection(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    const page = this.page;
    for (let i = 0; i <= 3; i++) {
      const character = String.fromCharCode("A".charCodeAt(0) + i);
      await page.check(`#jurisdictionConnections-${character}`);
    }
    await this.clickContinue();
  }
}
