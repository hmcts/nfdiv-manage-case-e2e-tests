import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {CommonContent} from "../../../fixtures/CommonContent.ts";

enum RadioButtonElementIds {
  applicant1ScreenHasMarriageBrokenYes = '#applicant1ScreenHasMarriageBroken_Yes',
}

export class MarriageBrokenDownIrretrievablyPage {

  public static async marriageBrokenDown(
    page: Page,
  ): Promise<void> {

    await this.checkPageLoads(page);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${CommonContent.pageTitle}")`,
      );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    await page.locator(RadioButtonElementIds.applicant1ScreenHasMarriageBrokenYes).check();

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.continueButton}")`,
    );
  }
}
