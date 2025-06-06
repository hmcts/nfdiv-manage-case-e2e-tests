import {Page} from "@playwright/test";
import {Helpers} from "../../../../../common/helpers.ts";
import {
  ApplicationSolStatementOfTruthPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolStatementOfTruthPage.ts";
import {
  ApplicationSolPaymentPage, paymentMethod
} from "../../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPaymentPage.ts";


interface SignAndSubmitOptions {
  page: Page;
  solicitorPayment: paymentMethod;
}

export class SignAndSubmit {
  public static async signAndSubmit ({
                                       page,
                                       solicitorPayment
                                     } : SignAndSubmitOptions ): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Sign and submit");
    await ApplicationSolStatementOfTruthPage.applicationSolStatementOfTruthPage({page});
    await ApplicationSolPaymentPage.applicationSolPaymentPage({page, solicitorPayment});
  }
}
