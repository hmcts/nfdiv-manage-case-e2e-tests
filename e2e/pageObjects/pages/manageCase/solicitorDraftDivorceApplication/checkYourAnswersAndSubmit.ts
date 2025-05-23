import {Page} from "@playwright/test";
import {Selectors} from "../../../../common/selectors.ts";
import {CommonContent} from "../../../fixtures/CommonContent.ts";

export class CheckYourAnswersAndSubmitPage {

  public static async checkYourAnswers(
    page: Page,
  ): Promise<void> {

    await this.checkPageLoads(page);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
  ): Promise<void> {
    await page.locator(`${Selectors.GovukCaptionL}:text-is("${CommonContent.pageTitle}")`,).waitFor();
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    await page.click(`${Selectors.button}:text-is("${CommonContent.saveApplication}")`);
  }
}
