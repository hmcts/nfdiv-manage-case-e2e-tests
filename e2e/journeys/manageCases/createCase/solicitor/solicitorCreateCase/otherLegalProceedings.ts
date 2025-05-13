import {Page} from "@playwright/test";
import {OtherLegalProceedingsPage} from "../../../../../pages/manageCase/solicitorCreateCase/otherLegalProceedings.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class OtherLegalProceedings {
  public static async otherLegalProceedings({
     page,
  }: SolicitorCreateCaseOptions): Promise<string> {

    await OtherLegalProceedingsPage.otherLegalProceedings(page, false);
  }
}
