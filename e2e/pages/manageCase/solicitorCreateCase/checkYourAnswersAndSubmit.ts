import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";

export class CheckYourAnswersAndSubmitPage {

  public static async checkYourAnswers(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {

    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukCaptionL}:text-is("${AboutApplicants.pageTitle}")`,
    );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    const button = await page.locator(`${Selectors.button}:text-is("${AboutApplicants.saveApplication}")`);
    await button.scrollIntoViewIfNeeded();
    await button.click();
    await page.waitForTimeout(10000);
  }
}
