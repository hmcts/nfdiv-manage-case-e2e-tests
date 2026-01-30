import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { MarriageBrokenDownIrretrievablyContent } from "../constants/solicitorDraftDivorceApplicationContent.ts";

export class MarriageBrokenDownIrretrievablyPage extends BaseJourneyPage {
  private readonly brokenYes: Locator;

  constructor(page: Page) {
    super(page);
    this.brokenYes = page.locator(
      MarriageBrokenDownIrretrievablyContent.selectors.radioButtons
        .applicant1ScreenHasMarriageBrokenYes,
    );
  }

  public async marriageBrokenDown(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.brokenYes.check();
    await this.clickContinue();
  }
}
