import { test } from "../../../../fixtures/fixtures";
import { config } from "../../../../config";
import { Helpers } from "../../../../common/helpers";
import { Events } from "../../../../common/types";

test.describe("Solicitor create application tests", (): void => {
  test.use({
    storageState: config.users.solicitor.sessionFile,
  });

  test(`Log in as a solicitor and start creating a case:
  Accessibility testing,
  Error message testing,
  saying yes to all options, @nightly @regression @smoke`, async ({
    determinePage,
    axeUtils,
    solicitorCreatePage,
    howDoYouWantToApplyForDivorcePage,
    solAboutTheSolicitorPage,
    marriageBrokenDownIrretrievablyPage,
    aboutApplicantPage,
    aboutRespondentOrApplicantTwoPage,
    applicantTwoServiceDetailsPage,
    marriageCertificateDetailsPage,
    jurisdictionApplyForDivorceOrDissolutionPage,
    otherLegalProceedingsPage,
    financialOrdersPage,
    uploadSupportingDocumentsPage,
    checkYourAnswersAndSubmitPage,
    applicationSolStatementOfTruthPage,
    applicationSolPaymentPage,
    applicationSolPayAccountPage,
    applicationSolPaymentSummaryPage,
    signAndSubmitSubmitPage,
  }): Promise<void> => {
    // Draft Application
    await solicitorCreatePage.navigateToCreateCasePage(); // Method is in baseJourneyPage.ts. SolicitorCreatePage extends BaseJourneyPage.
    await solicitorCreatePage.solicitorCreatePage();
    await howDoYouWantToApplyForDivorcePage.createApplicationTypePage();
    await solAboutTheSolicitorPage.solAboutTheSolicitor();
    await marriageBrokenDownIrretrievablyPage.marriageBrokenDown();
    await aboutApplicantPage.aboutApplicant();
    await aboutRespondentOrApplicantTwoPage.aboutRespondentOrApplicantTwo();
    await applicantTwoServiceDetailsPage.applicantTwoServiceDetails();
    await marriageCertificateDetailsPage.marriageCertificateDetails();
    await jurisdictionApplyForDivorceOrDissolutionPage.jurisdictionConnection();
    await otherLegalProceedingsPage.otherLegalProceedings();
    await financialOrdersPage.financialOrders();
    await uploadSupportingDocumentsPage.uploadSupportingDocuments();
    await checkYourAnswersAndSubmitPage.checkYourAnswers();

    // Sign and Submit
    await Helpers.chooseEventFromDropdown(determinePage, Events.signAndSubmit);
    await applicationSolStatementOfTruthPage.applicationSolStatementOfTruthPage(
      { accessibility: true, axeUtil: axeUtils },
    );
    await applicationSolPaymentPage.applicationSolPaymentPage({
      accessibility: true,
      axeUtil: axeUtils,
      solicitorPayment: "pba",
    });
    await applicationSolPayAccountPage.applicationSolPayAccountPage({
      accessibility: true,
      axeUtil: axeUtils,
    });
    await applicationSolPaymentSummaryPage.applicationSolPaymentSummaryPage({
      accessibility: true,
      axeUtil: axeUtils,
    });
    await signAndSubmitSubmitPage.signAndSubmitSubmitPage({
      accessibility: true,
      axeUtil: axeUtils,
    });
    console.log("Test passed");
  });
});
