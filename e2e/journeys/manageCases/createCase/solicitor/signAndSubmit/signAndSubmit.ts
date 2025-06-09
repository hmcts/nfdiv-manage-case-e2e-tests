import {Page} from "@playwright/test";
import {Helpers} from "../../../../../common/helpers.ts";
import {
  ApplicationSolStatementOfTruthPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolStatementOfTruthPage.ts";
import {
  ApplicationSolPaymentPage, paymentMethod
} from "../../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPaymentPage.ts";
import {
  ApplicationSolPayAccountPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPayAccountPage.ts";
import {
  ApplicationSolPaymentSummaryPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPaymentSummaryPage.ts";
import {
  SignAndSubmitSubmitPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/submitPage.ts";


interface SignAndSubmitOptions {
  page: Page;
  solicitorPayment: paymentMethod;
}

export class SignAndSubmit {
  public static async signAndSubmit({
  page,
  solicitorPayment
  }: SignAndSubmitOptions): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Sign and submit");
    await ApplicationSolStatementOfTruthPage.applicationSolStatementOfTruthPage({page});
    await ApplicationSolPaymentPage.applicationSolPaymentPage({page, solicitorPayment});
    await ApplicationSolPayAccountPage.applicationSolPayAccountPage({page});
    await ApplicationSolPaymentSummaryPage.applicationSolPaymentSummaryPage({page});
    await SignAndSubmitSubmitPage.signAndSubmitSubmitPage({page});
  }
}
