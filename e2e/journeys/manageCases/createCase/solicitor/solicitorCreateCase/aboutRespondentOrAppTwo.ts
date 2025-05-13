import {Page} from "@playwright/test";
import {CommonPage} from "../../../../CommonPage.ts";
import Config from "../../../../../config.ts";
import {AboutRespOrApplicantTwoPage} from "../../../../../pages/manageCase/solicitorCreateCase/aboutRespOrApplicantTwo.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class AboutRespondentOrAppTwo {
  public static async aboutRespondentOrAppTwo({
     page,
  }: SolicitorCreateCaseOptions): Promise<void> {

    await AboutRespOrApplicantTwoPage.aboutRespondentOrApplicantTwo(page, false);
  }
}
