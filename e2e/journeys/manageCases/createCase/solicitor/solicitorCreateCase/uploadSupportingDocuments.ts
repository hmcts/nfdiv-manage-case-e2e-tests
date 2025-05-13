import {Page} from "@playwright/test";
import {
  UploadSupportingDocumentsPage
} from "../../../../../pages/manageCase/solicitorCreateCase/uploadSupportingDocuments.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class UploadSupportingDocuments {
  public static async uploadSupportingDocuments({
     page,
  }: SolicitorCreateCaseOptions): Promise<void> {

    await UploadSupportingDocumentsPage.uploadSupportingDocuments(page);
  }
}
