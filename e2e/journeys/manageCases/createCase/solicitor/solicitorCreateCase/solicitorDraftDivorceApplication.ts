import {CommonPage} from "../../../../CommonPage.ts";
import {Page} from "@playwright/test";
import {SolicitorCreatePage} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/solicitorCreateCase.ts";
import {
  AboutRespondentOrApplicantTwoPage
} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/aboutRespondentOrApplicantTwo.ts";
import {
  ApplicantTwoServiceDetailsPage
} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/applicantTwoServiceDetails.ts";
import {
  HowDoYouWantToApplyForDivorcePage
} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/howDoYouWantToApplyForDivorce.ts";
import {SolAboutTheSolicitorPage} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/solAboutTheSolicitor.ts";
import {
  MarriageBrokenDownIrretrievablyPage
} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/marriageBrokenDownIrretrievably.ts";
import {AboutApplicantPage} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/aboutApplicant.ts";
import {
  MarriageCertificateDetailsPage
} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/marriageCertificateDetails.ts";
import {
  JurisdictionApplyForDivorceOrDissolutionPage
} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/jurisdictionApplyForDivorceOrDissolution.ts";
import {OtherLegalProceedingsPage} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/otherLegalProceedings.ts";
import {FinancialOrdersPage} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/financialOrders.ts";
import {
  UploadSupportingDocumentsPage
} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/uploadSupportingDocuments.ts";
import {
  CheckYourAnswersAndSubmitPage
} from "../../../../../pages/manageCase/solicitorDraftDivorceApplication/checkYourAnswersAndSubmit.ts";

interface SolicitorCreateOptions {
  page: Page;
}

export class SolicitorDraftDivorceApplication {
  public static async draftApplication({
                                            page,
                                          } : SolicitorCreateOptions ): Promise<void> {

    await CommonPage.navigateToCreateCasePage(page);

    await SolicitorCreatePage.solicitorCreatePage(page);
    await HowDoYouWantToApplyForDivorcePage.createApplicationTypePage(page);
    await SolAboutTheSolicitorPage.solAboutTheSolicitor(page);
    await MarriageBrokenDownIrretrievablyPage.marriageBrokenDown(page);
    await AboutApplicantPage.aboutApplicant(page);
    await AboutRespondentOrApplicantTwoPage.aboutRespondentOrApplicantTwo(page);
    await ApplicantTwoServiceDetailsPage.applicantTwoServiceDetails(page);
    await MarriageCertificateDetailsPage.marriageCertificateDetails(page);
    await JurisdictionApplyForDivorceOrDissolutionPage.jurisdictionConnection(page);
    await OtherLegalProceedingsPage.otherLegalProceedings(page);
    await FinancialOrdersPage.financialOrders(page);
    await UploadSupportingDocumentsPage.uploadSupportingDocuments(page);
    await CheckYourAnswersAndSubmitPage.checkYourAnswers(page);
  }
}
