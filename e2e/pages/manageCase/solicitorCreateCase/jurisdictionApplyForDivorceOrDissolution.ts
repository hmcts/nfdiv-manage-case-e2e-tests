import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";

import {
  HowDoYouWantToApplyForDivorce
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/howDoYouWantToApplyForDivorce.ts";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";
import {
  SolicitorCreateCaseStart
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solicitorCreateCaseStart.ts";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";

export class JurisdictionApplyForDivorceOrDissolutionPage {

  public static async jurisdictionConnection(
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

    for (let i = 0; i <= 3; i++) {
      let character = String.fromCharCode('A'.charCodeAt(0) + i);
      await page.check(`#jurisdictionConnections-${character}`);
    }

    await page.click(
      `${Selectors.button}:text-is("${SolAboutTheSolicitor.continueButton}")`,
    );
  }
}
