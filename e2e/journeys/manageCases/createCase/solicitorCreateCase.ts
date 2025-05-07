import {Page} from "@playwright/test";
import Config from "../../../config.ts";
import {SolicitorCreateCaseStart} from "./solicitor/solicitorCreateCase/solicitorCreateCaseStart.ts";
import idamLoginHelper from "../../../common/userHelpers/idamLoginHelper.ts";
import {HowDoYouWantToApplyForDivorce} from "./solicitor/solicitorCreateCase/howDoYouWantToApplyForDivorce.ts";
import {UserRole} from "../../../common/types.ts";

interface CreateCaseOptions {
  page: Page;
  accessibilityTest: boolean;
  caseType: string;
  user: UserRole;
}

export class CreateCase {
  public static async createCase({
                                   page,
                                   accessibilityTest,
                                   caseType,
                                   user
                                 }: CreateCaseOptions): Promise<void> {

    await idamLoginHelper.signInLongLivedUser(page, user, Config.manageCasesBaseURLCase);
    await SolicitorCreateCaseStart.solicitorCreateCase({
      page: page,
      accessibilityTest: accessibilityTest,
      caseType: caseType,
      user: user
    });

   // await HowDoYouWantToApplyForDivorce.applicationType({page: page})
  }
}
