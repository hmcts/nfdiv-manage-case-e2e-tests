import {Page} from "@playwright/test";
import {SolicitorCreateCaseStart} from "./solicitorCreateCaseStart.ts";
import {CommonPage} from "../../../../CommonPage.ts";
import {SolicitorCreatePage} from "../../../../../pages/manageCase/solicitorCreateCase/solicitorCreateCase.ts";
import Config from "../../../../../config.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class HowDoYouWantToApplyForDivorce {
  public static async applicationType({
     page,
  }: SolicitorCreateCaseOptions): Promise<string> {

    //await CommonPage.navigateToPage(Config.manageCasesCreateCaseURL, page, {paths: ['solicitor-create-applicationhowDoYouWantToApplyForDivorce'], eventId: 'solicitor-create-application'});
   // await SolicitorCreatePage.solicitorCreatePage(page, false);
    //await CommonPage.startCreateCaseEvent(page);
  }
}
