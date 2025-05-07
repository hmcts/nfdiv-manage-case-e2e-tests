import {Page} from "@playwright/test";
import {caseType, UserRole} from "../../../../../common/types.ts";
import {SolicitorCreatePage} from "../../../../../pages/manageCase/solicitorCreateCase/solicitorCreateCase.ts";
import {CommonPage} from "../../../../CommonPage.ts";
import Config from "../../../../../config.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
  accessibilityTest: boolean;
  caseType: string;
  user: UserRole;
}

export class SolicitorCreateCaseStart {
  public static async solicitorCreateCase({
 page,
 caseType,
 accessibilityTest,
 user
 } : SolicitorCreateCaseOptions ): Promise<void> {
    await CommonPage.navigateToPage(Config.manageCasesBaseURLCase, page, {paths: ['case-filter']});
    await SolicitorCreatePage.solicitorCreatePage(page, false);
    await CommonPage.startCreateCaseEvent(page);
  }
}
