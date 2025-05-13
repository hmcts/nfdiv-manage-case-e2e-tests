import {Page} from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import {
  HowDoYouWantToApplyForDivorce
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/howDoYouWantToApplyForDivorce.ts";

export class HowDoYouWantToApplyForDivorcePage {
  public static async createApplicationTypePage(
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

    await page.locator(HowDoYouWantToApplyForDivorce.radioButtonDivorceId).check();
    await page.waitForSelector(HowDoYouWantToApplyForDivorce.radioButtonSoleApplicationId);
    await page.locator(HowDoYouWantToApplyForDivorce.radioButtonSoleApplicationId).check();
    await page.click(`${Selectors.button}:text-is("${HowDoYouWantToApplyForDivorce.continueButton}")`,
    );
  }
}
