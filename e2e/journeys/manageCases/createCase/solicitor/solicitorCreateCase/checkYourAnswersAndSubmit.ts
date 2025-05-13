import {Page} from "@playwright/test";
import {
  CheckYourAnswersAndSubmitPage
} from "../../../../../pages/manageCase/solicitorCreateCase/checkYourAnswersAndSubmit.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class CheckYourAnswersAndSubmit {
  public static async checkYourAnswers({
     page,
  }: SolicitorCreateCaseOptions): Promise<string> {

    await CheckYourAnswersAndSubmitPage.checkYourAnswers(page, false);
  }
}
