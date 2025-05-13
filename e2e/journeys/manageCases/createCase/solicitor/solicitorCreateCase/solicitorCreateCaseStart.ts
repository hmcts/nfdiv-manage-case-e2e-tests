import {Page} from "@playwright/test";
import { UserRole} from "../../../../../common/types.ts";
import {SolicitorCreatePage} from "../../../../../pages/manageCase/solicitorCreateCase/solicitorCreateCase.ts";
import {CommonPage} from "../../../../CommonPage.ts";

interface SolicitorCreateOptions {
  page: Page;
  accessibilityTest: boolean;
  caseType: string;
  user: UserRole;
}

export class SolicitorCreateCaseStart {
  public static async solicitorCreateCase({
 page,
 } : SolicitorCreateOptions ): Promise<void> {

    await CommonPage.navigateToCreateCasePage(page);
    await SolicitorCreatePage.solicitorCreatePage(page);
  }
}
