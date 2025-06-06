import {Page} from "@playwright/test";
import {SolicitorDraftDivorceApplication} from "./solicitor/solicitorCreateCase/solicitorDraftDivorceApplication.ts";
import {SignAndSubmit} from "./solicitor/signAndSubmit/signAndSubmit.ts";
import {
  paymentMethod
} from "../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPaymentPage.ts";

interface CreateCaseOptions {
  page: Page;
  solicitorPayment: paymentMethod;
}

export class CreateCase {
  public static async createCase({
                                   page,
                                   solicitorPayment
                                 }: CreateCaseOptions): Promise<void> {
    await SolicitorDraftDivorceApplication.draftApplication({page});
    await SignAndSubmit.signAndSubmit({page, solicitorPayment});
  }
}
