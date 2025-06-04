import {Page} from "@playwright/test";
import {SolicitorDraftDivorceApplication} from "./solicitor/solicitorCreateCase/solicitorDraftDivorceApplication.ts";
import {SignAndSubmit} from "./solicitor/signAndSubmit/signAndSubmit.ts";

interface CreateCaseOptions {
  page: Page;
}

export class CreateCase {
  public static async createCase({
                                   page,
                                 }: CreateCaseOptions): Promise<void> {

    await SolicitorDraftDivorceApplication.draftApplication({page});
    await SignAndSubmit.signAndSubmit({page})
  }
}
