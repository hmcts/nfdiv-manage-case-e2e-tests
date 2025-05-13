import {Page} from "@playwright/test";
import {Selectors} from "../../../common/selectors";
import {
  SolAboutTheSolicitor
} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/solAboutTheSolicitor.ts";
import {AboutApplicants} from "../../../fixtures/manageCases/createCase/solicitorCreateCase/aboutApplicants.ts";

export class JurisdictionApplyForDivorceOrDissolutionPage {

  public static async jurisdictionConnection(
    page: Page,
  ): Promise<void> {

    await this.checkPageLoads(page);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukCaptionL}:text-is("${AboutApplicants.pageTitle}")`,
    );
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    for (let i = 0; i <= 3; i++) {
      const character = String.fromCharCode('A'.charCodeAt(0) + i);
      await page.check(`#jurisdictionConnections-${character}`);
    }

    await page.click(
      `${Selectors.button}:text-is("${SolAboutTheSolicitor.continueButton}")`,
    );
  }
}
