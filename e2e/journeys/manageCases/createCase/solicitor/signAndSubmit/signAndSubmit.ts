import {Page} from "@playwright/test";
import {Helpers} from "../../../../../common/helpers.ts";
import {
  ApplicationSolStatementOfTruthPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolStatementOfTruthPage.ts";
import {
  ApplicationSolPaymentPage,
  SolicitorPayment,
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
import {Events} from "../../../../../common/types.ts";


interface SignAndSubmitOptions {
  page: Page;
  accessibility: boolean;
  axeUtil: AxeUtils;
  solicitorPayment: SolicitorPayment;
}

export class SignAndSubmit {
  public static async signAndSubmit({
    page,
    accessibility,
    axeUtil,
    solicitorPayment
  }: SignAndSubmitOptions): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, Events.signAndSubmit);
    await ApplicationSolStatementOfTruthPage.applicationSolStatementOfTruthPage({page, accessibility, axeUtil});
    await ApplicationSolPaymentPage.applicationSolPaymentPage({page, accessibility, axeUtil, solicitorPayment});
    await ApplicationSolPayAccountPage.applicationSolPayAccountPage({page, accessibility, axeUtil,});
    await ApplicationSolPaymentSummaryPage.applicationSolPaymentSummaryPage({page, accessibility, axeUtil,});
    await SignAndSubmitSubmitPage.signAndSubmitSubmitPage({page, accessibility, axeUtil,});
  }
}
