import {Page} from "@playwright/test";
import {
  MarriageCertificateDetailsPage
} from "../../../../../pages/manageCase/solicitorCreateCase/marriageCertificateDetails.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class MarriageCertificateDetails {
  public static async marriageCertificateDetails({
     page,
  }: SolicitorCreateCaseOptions): Promise<string> {

    await MarriageCertificateDetailsPage.marriageCertificateDetails(page, false);
  }
}
