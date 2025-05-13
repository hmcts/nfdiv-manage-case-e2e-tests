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
  }: SolicitorCreateCaseOptions): Promise<void> {

    await JurisdictionApplyForDivorceOrDissolutionPage.jurisdictionConnection(page);
  }
}
