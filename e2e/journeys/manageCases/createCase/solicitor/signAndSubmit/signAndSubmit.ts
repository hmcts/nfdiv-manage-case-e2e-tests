import {Page} from "@playwright/test";
import {Helpers} from "../../../../../common/helpers.ts";
import {
  ApplicationSolStatementOfTruthPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolStatementOfTruthPage.ts";


interface SignAndSubmitOptions {
  page: Page;
}

export class SignAndSubmit {
  public static async signAndSubmit ({
                                       page,
                                     } : SignAndSubmitOptions ): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Sign and submit");
    await ApplicationSolStatementOfTruthPage.applicationSolStatementOfTruthPage({page})
  }
}
