import {Page} from "@playwright/test";
import {AboutApplicantPage} from "../../../../../pages/manageCase/solicitorCreateCase/aboutApplicant.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class AboutApplicant {
  public static async aboutApplicant({
     page,
  }: SolicitorCreateCaseOptions): Promise<string> {

    await AboutApplicantPage.aboutApplicant(page, false);
  }
}
