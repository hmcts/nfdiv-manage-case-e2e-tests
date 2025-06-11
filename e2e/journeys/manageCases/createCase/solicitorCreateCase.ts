import {Page} from "@playwright/test";
import {SolicitorDraftDivorceApplication} from "./solicitor/solicitorCreateCase/solicitorDraftDivorceApplication.ts";
import {SignAndSubmit} from "./solicitor/signAndSubmit/signAndSubmit.ts";
import {
  SolicitorPayment
} from "../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPaymentPage.ts";
import {AxeUtils} from "@hmcts/playwright-common";

interface CreateCaseOptions {
  page: Page;
  accessibility: boolean;
  axeUtil: AxeUtils;
  solicitorPayment: SolicitorPayment;
}

export class CreateCase {
  public static async createCase({
    page,
    accessibility,
    axeUtil,
    solicitorPayment
  }: CreateCaseOptions): Promise<void> {
    await SolicitorDraftDivorceApplication.draftApplication({page});
    await SignAndSubmit.signAndSubmit({page, accessibility, axeUtil, solicitorPayment});
  }
}
