import {Page} from "@playwright/test";
import {AboutRespOrApplicantTwoPage} from "../../../../../pages/manageCase/solicitorCreateCase/aboutRespOrApplicantTwo.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class AboutRespondentOrAppTwo {
  public static async aboutRespondentOrAppTwo({
     page,
  }: SolicitorCreateCaseOptions): Promise<void> {

    await AboutRespOrApplicantTwoPage.aboutRespondentOrApplicantTwo(page);
  }
}
