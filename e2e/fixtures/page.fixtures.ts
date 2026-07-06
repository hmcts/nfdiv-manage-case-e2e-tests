import { IdamPage } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { SolicitorCreatePage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/solicitorCreateCase";
import { AboutRespondentOrApplicantTwoPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/aboutRespondentOrApplicantTwo";
import { ApplicantTwoServiceDetailsPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/applicantTwoServiceDetails";
import { HowDoYouWantToApplyForDivorcePage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/howDoYouWantToApplyForDivorce";
import { SolAboutTheSolicitorPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/solAboutTheSolicitor";
import { MarriageBrokenDownIrretrievablyPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/marriageBrokenDownIrretrievably";
import { AboutApplicantPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/aboutApplicant";
import { MarriageCertificateDetailsPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/marriageCertificateDetails";
import { JurisdictionApplyForDivorceOrDissolutionPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/jurisdictionApplyForDivorceOrDissolution";
import { OtherLegalProceedingsPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/otherLegalProceedings";
import { FinancialOrdersPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/financialOrders";
import { UploadSupportingDocumentsPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/uploadSupportingDocuments";
import { CheckYourAnswersAndSubmitPage } from "../pageObjects/pages/manageCase/solicitor/solicitorDraftDivorceApplication/checkYourAnswersAndSubmit";
import { ApplicationSolStatementOfTruthPage } from "../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolStatementOfTruthPage";
import { ApplicationSolPaymentPage } from "../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPaymentPage";
import { ApplicationSolPayAccountPage } from "../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPayAccountPage";
import { ApplicationSolPaymentSummaryPage } from "../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPaymentSummaryPage";
import { SignAndSubmitSubmitPage } from "../pageObjects/pages/manageCase/solicitor/signAndSubmit/submitPage";
import { EventPage } from "../pageObjects/pages/manageCase/caseworker/caseFlags/Common/eventPage.ts";
import { SelectFlagLevel } from "../pageObjects/pages/manageCase/caseworker/caseFlags/createCaseFlags/selectFlagLevel.ts";
import { SelectFlagType } from "../pageObjects/pages/manageCase/caseworker/caseFlags/createCaseFlags/selectFlagType.ts";
import { SelectSpecialMeasurePage } from "../pageObjects/pages/manageCase/caseworker/caseFlags/createCaseFlags/selectSpecialMeasurePage.ts";
import { AddCommentsPage } from "../pageObjects/pages/manageCase/caseworker/caseFlags/createCaseFlags/addCommentsPage.ts";
import { ConfirmStatusPage } from "../pageObjects/pages/manageCase/caseworker/caseFlags/createCaseFlags/confirmStatusPage.ts";
import { ReviewFlagDetailsPage } from "../pageObjects/pages/manageCase/caseworker/caseFlags/Common/reviewFlagDetailsPage.ts";
import { ConfirmationPage } from "../pageObjects/pages/manageCase/caseworker/caseFlags/Common/confirmationPage.ts";
import { CaseFlagsTabPage } from "../pageObjects/pages/manageCase/caseworker/caseFlags/Common/caseFlagsTabPage.ts";
import { SelectFlagPage } from "../pageObjects/pages/manageCase/caseworker/caseFlags/manageCaseFlags/selectFlagPage.ts";
import { updateFlagPage } from "../pageObjects/pages/manageCase/caseworker/caseFlags/manageCaseFlags/updateFlagPage.ts";

export interface PageFixtures {
  determinePage: Page;
  idamPage: IdamPage;
  solicitorCreatePage: SolicitorCreatePage;
  howDoYouWantToApplyForDivorcePage: HowDoYouWantToApplyForDivorcePage;
  solAboutTheSolicitorPage: SolAboutTheSolicitorPage;
  marriageBrokenDownIrretrievablyPage: MarriageBrokenDownIrretrievablyPage;
  aboutApplicantPage: AboutApplicantPage;
  aboutRespondentOrApplicantTwoPage: AboutRespondentOrApplicantTwoPage;
  applicantTwoServiceDetailsPage: ApplicantTwoServiceDetailsPage;
  marriageCertificateDetailsPage: MarriageCertificateDetailsPage;
  jurisdictionApplyForDivorceOrDissolutionPage: JurisdictionApplyForDivorceOrDissolutionPage;
  otherLegalProceedingsPage: OtherLegalProceedingsPage;
  financialOrdersPage: FinancialOrdersPage;
  uploadSupportingDocumentsPage: UploadSupportingDocumentsPage;
  checkYourAnswersAndSubmitPage: CheckYourAnswersAndSubmitPage;
  applicationSolStatementOfTruthPage: ApplicationSolStatementOfTruthPage;
  applicationSolPaymentPage: ApplicationSolPaymentPage;
  applicationSolPayAccountPage: ApplicationSolPayAccountPage;
  applicationSolPaymentSummaryPage: ApplicationSolPaymentSummaryPage;
  signAndSubmitSubmitPage: SignAndSubmitSubmitPage;
  caseFlagsEventPage: EventPage;
  caseFlagsLevelPage: SelectFlagLevel;
  caseFlagsTypePage: SelectFlagType;
  caseFlagsSpecialMeasurePage: SelectSpecialMeasurePage;
  caseFlagsCommentsPage: AddCommentsPage;
  caseFlagsStatusPage: ConfirmStatusPage;
  caseFlagsReviewPage: ReviewFlagDetailsPage;
  caseFlagsConfirmationPage: ConfirmationPage;
  caseFlagsTabPage: CaseFlagsTabPage;
  manageFlagsSelectFlagPage: SelectFlagPage;
  manageFlagsUpdateFlagPage: updateFlagPage;
}

export const pageFixtures = {
  determinePage: async ({ page, lighthousePage }, use, testInfo) => {
    if (testInfo.tags.includes("@performance")) {
      await use(lighthousePage);
    } else {
      await use(page);
    }
  },
  idamPage: async ({ determinePage }, use) => {
    await use(new IdamPage(determinePage));
  },
  solicitorCreatePage: async ({ determinePage }, use) => {
    await use(new SolicitorCreatePage(determinePage));
  },
  howDoYouWantToApplyForDivorcePage: async ({ determinePage }, use) => {
    await use(new HowDoYouWantToApplyForDivorcePage(determinePage));
  },
  solAboutTheSolicitorPage: async ({ determinePage }, use) => {
    await use(new SolAboutTheSolicitorPage(determinePage));
  },
  marriageBrokenDownIrretrievablyPage: async ({ determinePage }, use) => {
    await use(new MarriageBrokenDownIrretrievablyPage(determinePage));
  },
  aboutApplicantPage: async ({ determinePage }, use) => {
    await use(new AboutApplicantPage(determinePage));
  },
  aboutRespondentOrApplicantTwoPage: async ({ determinePage }, use) => {
    await use(new AboutRespondentOrApplicantTwoPage(determinePage));
  },
  applicantTwoServiceDetailsPage: async ({ determinePage }, use) => {
    await use(new ApplicantTwoServiceDetailsPage(determinePage));
  },
  marriageCertificateDetailsPage: async ({ determinePage }, use) => {
    await use(new MarriageCertificateDetailsPage(determinePage));
  },
  jurisdictionApplyForDivorceOrDissolutionPage: async (
    { determinePage },
    use,
  ) => {
    await use(new JurisdictionApplyForDivorceOrDissolutionPage(determinePage));
  },
  otherLegalProceedingsPage: async ({ determinePage }, use) => {
    await use(new OtherLegalProceedingsPage(determinePage));
  },
  financialOrdersPage: async ({ determinePage }, use) => {
    await use(new FinancialOrdersPage(determinePage));
  },
  uploadSupportingDocumentsPage: async ({ determinePage }, use) => {
    await use(new UploadSupportingDocumentsPage(determinePage));
  },
  checkYourAnswersAndSubmitPage: async ({ determinePage }, use) => {
    await use(new CheckYourAnswersAndSubmitPage(determinePage));
  },
  applicationSolStatementOfTruthPage: async ({ determinePage }, use) => {
    await use(new ApplicationSolStatementOfTruthPage(determinePage));
  },
  applicationSolPaymentPage: async ({ determinePage }, use) => {
    await use(new ApplicationSolPaymentPage(determinePage));
  },
  applicationSolPayAccountPage: async ({ determinePage }, use) => {
    await use(new ApplicationSolPayAccountPage(determinePage));
  },
  applicationSolPaymentSummaryPage: async ({ determinePage }, use) => {
    await use(new ApplicationSolPaymentSummaryPage(determinePage));
  },
  signAndSubmitSubmitPage: async ({ determinePage }, use) => {
    await use(new SignAndSubmitSubmitPage(determinePage));
  },
  caseFlagsEventPage: async ({ determinePage }, use) => {
    await use(new EventPage(determinePage));
  },
  caseFlagsLevelPage: async ({ determinePage }, use) => {
    await use(new SelectFlagLevel(determinePage));
  },
  caseFlagsTypePage: async ({ determinePage }, use) => {
    await use(new SelectFlagType(determinePage));
  },
  caseFlagsCommentsPage: async ({ determinePage }, use) => {
    await use(new AddCommentsPage(determinePage));
  },
  caseFlagsSpecialMeasurePage: async ({ determinePage }, use) => {
    await use(new SelectSpecialMeasurePage(determinePage));
  },
  caseFlagsStatusPage: async ({ determinePage }, use) => {
    await use(new ConfirmStatusPage(determinePage));
  },
  caseFlagsReviewPage: async ({ determinePage }, use) => {
    await use(new ReviewFlagDetailsPage(determinePage));
  },
  caseFlagsConfirmationPage: async ({ determinePage }, use) => {
    await use(new ConfirmationPage(determinePage));
  },
  caseFlagsTabPage: async ({ determinePage }, use) => {
    await use(new CaseFlagsTabPage(determinePage));
  },
  manageFlagsSelectFlagPage: async ({ determinePage }, use) => {
    await use(new SelectFlagPage(determinePage));
  },
  manageFlagsUpdateFlagPage: async ({ determinePage }, use) => {
    await use(new updateFlagPage(determinePage));
  },
};
