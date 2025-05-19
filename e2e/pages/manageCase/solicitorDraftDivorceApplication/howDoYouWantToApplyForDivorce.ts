import {Page} from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import {CommonContent} from "../../../fixtures/CommonContent.ts";

enum RadioButtonElementIds {
  radioButtonDivorce = '#divorceOrDissolution-divorce',
  radioButtonSoleApplication = '#applicationType-soleApplication',
}

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
    await page.locator(`${Selectors.GovukHeadingL}:text-is("${CommonContent.pageTitle}")`,).waitFor();
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    await page.locator(RadioButtonElementIds.radioButtonDivorce).check();

    const radioButtonSoleApplication = page.locator(RadioButtonElementIds.radioButtonSoleApplication);
    await radioButtonSoleApplication.waitFor();
    await radioButtonSoleApplication.check();

    await page.click(`${Selectors.button}:text-is("${CommonContent.continueButton}")`,
    );
  }
}
