import {Page} from "@playwright/test";
import {SolicitorDraftDivorceApplication} from "./solicitor/solicitorCreateCase/solicitorDraftDivorceApplication.ts";

interface CreateCaseOptions {
  page: Page;
}

export class CreateCase {
  public static async createCase({
                                   page,
                                 }: CreateCaseOptions): Promise<void> {

    await SolicitorDraftDivorceApplication.draftApplication({page: page});
  }
}
