import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../common/commonContent";
import { BaseJourneyPage } from "../common/baseJourneyPage";

export class CheckYourAnswersAndSubmitPage extends BaseJourneyPage {
  private readonly saveApplicationButton: Locator;
  private readonly saveAndContinueButton: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.saveApplicationButton = page.getByRole("button", {
      name: CommonContent.saveApplication,
    });
    this.saveAndContinueButton = page.getByRole("button", {
      name: CommonContent.saveAndContinue,
    });
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
