import {Page} from "@playwright/test";
import {
  HowDoYouWantToApplyForDivorcePage
} from "../../../../../pages/manageCase/solicitorCreateCase/howDoYouWantToApplyForDivorce.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class HowDoYouWantToApplyForDivorce {
  public static async applicationType({
     page,
  }: SolicitorCreateCaseOptions): Promise<string> {

    await HowDoYouWantToApplyForDivorcePage.createApplicationTypePage(page, false);
  }
}
