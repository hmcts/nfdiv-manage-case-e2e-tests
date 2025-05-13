import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {
  HowDoYouWantToApplyForDivorce
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/howDoYouWantToApplyForDivorce.ts";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";

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
      `${Selectors.GovukHeadingL}:text-is("${HowDoYouWantToApplyForDivorce.pageTitle}")`,
      );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    await page.locator('#applicant1ScreenHasMarriageBroken_Yes').check();
    await page.click(
      `${Selectors.button}:text-is("${SolAboutTheSolicitor.continueButton}")`,
    );
  }
}
