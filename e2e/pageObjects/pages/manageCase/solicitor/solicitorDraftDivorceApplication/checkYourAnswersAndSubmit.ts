import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";

export class CheckYourAnswersAndSubmitPage extends BaseJourneyPage {
  private readonly saveApplicationButton: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.saveApplicationButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.saveApplication}")`,
    );
  }

  public async checkYourAnswers(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.saveApplicationButton.click();
  }
}
