import {Page} from "@playwright/test";
import {
  ApplicantTwoServiceDetailsPage
} from "../../../../../pages/manageCase/solicitorCreateCase/applicantTwoServiceDetails.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class ApplicantTwoServiceDetails {
  public static async applicantTwoServiceDetails({
     page,
  }: SolicitorCreateCaseOptions): Promise<void> {

    await ApplicantTwoServiceDetailsPage.applicantTwoServiceDetails(page, false);
  }
}
