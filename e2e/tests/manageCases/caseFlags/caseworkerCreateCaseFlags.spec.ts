import { test } from "../../../fixtures/fixtures";
import { config } from "../../../config";
import { createSolicitorTestCase, setUsersCaseToState } from "../../../helper/case-update/progress-case";
import { State } from "../../../helper/case/definition";
import { solicitorCreateCase } from "../../fixtures/solicitorCreateCase";
import {EventPage} from "../../../pageObjects/pages/manageCase/caseworker/caseFlags/Common/eventPage.ts";

const CASE_FLAG_COMMENT = "Case Flag Test Comment";
const CASE_FLAG_STATUS_CHANGE_REASON = "Manage Case Flag Test Status Change Reason";
const PARTY_FLAG_COMMENT = "Party Flag Test Comment";
const PARTY_FLAG_STATUS_CHANGE_REASON = "Manage Party Flag Test Status Change Reason";

test.describe("Caseworker creates case flags", (): void => {
  test.use({
    storageState: config.users.caseworker.sessionFile,
  });

  test("create and manage one case-level flag for a new case", async ({
    idamPage,
    caseFlagsEventPage,
    caseFlagsLevelPage,
    caseFlagsTypePage,
    caseFlagsCommentsPage,
    caseFlagsStatusPage,
    caseFlagsReviewPage,
    caseFlagsConfirmationPage,
    caseFlagsTabPage,
    manageFlagsUpdateFlagPage,
    manageFlagsSelectFlagPage,
  }): Promise<void> => {

    const caseFlagComment = `${CASE_FLAG_COMMENT} ${Date.now().toString()}`;
    const caseFlagStatusChangeReason = `${CASE_FLAG_STATUS_CHANGE_REASON} ${Date.now().toString()}`;

    await createCaseAndStartCreateFlagsEvent(caseFlagsEventPage, idamPage);

    await caseFlagsLevelPage.selectCaseLevel();
    await caseFlagsTypePage.selectComplexCase();
    await caseFlagsCommentsPage.addFlagComment(caseFlagComment);
    await caseFlagsStatusPage.confirmActiveStatus();
    await caseFlagsReviewPage.reviewAndSubmitCaseLevel(caseFlagComment);
    await caseFlagsConfirmationPage.assertSuccess();
    await caseFlagsTabPage.assertCaseLevelFlagVisible(caseFlagComment);

    await caseFlagsEventPage.startManageFlagsEvent();
    await manageFlagsSelectFlagPage.selectComplexCase();
    await manageFlagsUpdateFlagPage.setFlagInactive(caseFlagStatusChangeReason);
    await caseFlagsReviewPage.reviewAndSubmitManageCaseLevel(caseFlagComment);
    await caseFlagsConfirmationPage.assertManageSuccess();
    await caseFlagsTabPage.assertUpdatedCaseLevelFlagVisible(caseFlagComment, caseFlagStatusChangeReason);
  });

  test("create and manage one party-level flag for a new case", async ({
    idamPage,
    caseFlagsEventPage,
    caseFlagsLevelPage,
    caseFlagsTypePage,
    caseFlagsSpecialMeasurePage,
    caseFlagsCommentsPage,
    caseFlagsStatusPage,
    caseFlagsReviewPage,
    caseFlagsConfirmationPage,
    caseFlagsTabPage,
    manageFlagsSelectFlagPage,
    manageFlagsUpdateFlagPage,
  }): Promise<void> => {

    const caseFlagComment = `${PARTY_FLAG_COMMENT} ${Date.now().toString()}`;
    const caseFlagStatusChangeReason = `${PARTY_FLAG_STATUS_CHANGE_REASON} ${Date.now().toString()}`;

    await createCaseAndStartCreateFlagsEvent(caseFlagsEventPage, idamPage);

    await caseFlagsLevelPage.selectPartyLevel();
    await caseFlagsTypePage.selectSpecialMeasure()
    await caseFlagsSpecialMeasurePage.selectScreeningWitness();
    await caseFlagsCommentsPage.addFlagComment(caseFlagComment);
    await caseFlagsStatusPage.confirmActiveStatus();
    await caseFlagsReviewPage.reviewAndSubmitPartyLevel(caseFlagComment);
    await caseFlagsConfirmationPage.assertSuccess();
    await caseFlagsTabPage.assertPartyLevelFlagVisible(caseFlagComment);

    await caseFlagsEventPage.startManageFlagsEvent();
    await manageFlagsSelectFlagPage.selectSpecialMeasure();
    await manageFlagsUpdateFlagPage.setFlagInactive(caseFlagStatusChangeReason);
    await caseFlagsReviewPage.reviewAndSubmitManagePartyLevel(caseFlagComment);
    await caseFlagsConfirmationPage.assertManageSuccess();
    await caseFlagsTabPage.assertUpdatedPartyLevelFlagVisible(caseFlagComment, caseFlagStatusChangeReason);
  });
});

async function createSubmittedDigitalCase(): Promise<string> {
  const userCase = (await createSolicitorTestCase(solicitorCreateCase));
  await setUsersCaseToState(userCase.id, State.Submitted);
  return userCase.id;
}

async function createCaseAndStartCreateFlagsEvent(caseFlagsEventPage: EventPage, idamPage): Promise<void> {
  const caseId = await createSubmittedDigitalCase();

  await caseFlagsEventPage.openCaseDetails(caseId, idamPage);
  await caseFlagsEventPage.runPrepareForCaseFlagsEvent();
  await caseFlagsEventPage.startCreateFlagsEvent();
}
