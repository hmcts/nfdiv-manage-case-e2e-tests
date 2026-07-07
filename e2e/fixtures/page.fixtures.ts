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
};
