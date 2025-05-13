import {Page} from "@playwright/test";
import {
  JurisdictionApplyForDivorceOrDissolutionPage
} from "../../../../../pages/manageCase/solicitorCreateCase/jurisdictionApplyForDivorceOrDissolution.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class JurisdictionApplyForDivorceOrDissolution {
  public static async jurisdictionConnection({
     page,
  }: SolicitorCreateCaseOptions): Promise<string> {

    await JurisdictionApplyForDivorceOrDissolutionPage.jurisdictionConnection(page, false);
  }
}
