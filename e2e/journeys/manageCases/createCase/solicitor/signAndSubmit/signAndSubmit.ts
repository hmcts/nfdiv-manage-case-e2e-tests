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
import {AxeUtils} from "@hmcts/playwright-common";


interface SignAndSubmitOptions {
  page: Page;
  accessibility: boolean;
  axeUtil: AxeUtils;
  solicitorPayment: paymentMethod;
}

export class SignAndSubmit {
  public static async signAndSubmit({
  page,
  accessibility,
  axeUtil,
  solicitorPayment
  }: SignAndSubmitOptions): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Sign and submit");
    await ApplicationSolStatementOfTruthPage.applicationSolStatementOfTruthPage({page, accessibility, axeUtil});
    await ApplicationSolPaymentPage.applicationSolPaymentPage({page, accessibility, axeUtil, solicitorPayment});
    await ApplicationSolPayAccountPage.applicationSolPayAccountPage({page, accessibility, axeUtil,});
    await ApplicationSolPaymentSummaryPage.applicationSolPaymentSummaryPage({page, accessibility, axeUtil,});
    await SignAndSubmitSubmitPage.signAndSubmitSubmitPage({page, accessibility, axeUtil,});
  }
}
