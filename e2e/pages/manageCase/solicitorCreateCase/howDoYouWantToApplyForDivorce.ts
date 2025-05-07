import {Page} from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import {Helpers} from "../../../common/helpers.ts";
import {SolicitorCreateCaseStart} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solicitorCreateCaseStart.ts";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper.ts";
import {chromium} from "playwright/test";
import {
  HowDoYouWantToApplyForDivorce
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/howDoYouWantToApplyForDivorce.ts";

export class HowDoYouWantToApplyForDivorcePage {
  public static async createApplicationTypePage(
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
      `${Selectors.GovukHeadingL}:text-is("${HowDoYouWantToApplyForDivorce.pageTitle}")`,
      );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {
    await page.locator(HowDoYouWantToApplyForDivorce.radioButtonDivorceId).check();
    await Helpers.checkVisibleAndPresent(page, HowDoYouWantToApplyForDivorce.soleApplication, 1);
    await page.locator(HowDoYouWantToApplyForDivorce.radioButtonSoleApplicationId).check();
    await page.click(`${Selectors.button}:text-is("${HowDoYouWantToApplyForDivorce.continueButton}")`,
    );
  }
}
