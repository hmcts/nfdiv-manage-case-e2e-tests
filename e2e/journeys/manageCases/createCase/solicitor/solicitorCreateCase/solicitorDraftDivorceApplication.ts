import {CommonPage} from "../../../../CommonPage.ts";
import {Page} from "@playwright/test";
import {SolicitorCreatePage} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/solicitorCreateCase.ts";
import {
  AboutRespondentOrApplicantTwoPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/aboutRespondentOrApplicantTwo.ts";
import {
  ApplicantTwoServiceDetailsPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/applicantTwoServiceDetails.ts";
import {
  HowDoYouWantToApplyForDivorcePage
} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/howDoYouWantToApplyForDivorce.ts";
import {SolAboutTheSolicitorPage} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/solAboutTheSolicitor.ts";
import {
  MarriageBrokenDownIrretrievablyPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/marriageBrokenDownIrretrievably.ts";
import {AboutApplicantPage} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/aboutApplicant.ts";
import {
  MarriageCertificateDetailsPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/marriageCertificateDetails.ts";
import {
  JurisdictionApplyForDivorceOrDissolutionPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/jurisdictionApplyForDivorceOrDissolution.ts";
import {OtherLegalProceedingsPage} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/otherLegalProceedings.ts";
import {FinancialOrdersPage} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/financialOrders.ts";
import {
  UploadSupportingDocumentsPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/uploadSupportingDocuments.ts";
import {
  CheckYourAnswersAndSubmitPage
} from "../../../../../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/checkYourAnswersAndSubmit.ts";

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
