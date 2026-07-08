import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { CommonContent } from "../../../common/commonContent";
import { BaseJourneyPage } from "../common/baseJourneyPage";

export class CheckYourAnswersAndSubmitPage extends BaseJourneyPage {
  private readonly saveApplicationButton: Locator;
  private readonly saveAndContinueButton: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.saveApplicationButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.saveApplication}")`,
    );
    this.saveAndContinueButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.saveAndContinue}")`,
    );
  }

  public async checkYourAnswers(buttonText: string): Promise<void> {
    await this.fillInFields(buttonText);
  }

  private async fillInFields(buttonText: string): Promise<void> {
    if (buttonText === CommonContent.saveApplication) {
      await this.saveApplicationButton.click();
    } else {
      await this.saveAndContinueButton.click();
    }
  }
}
