import { Logger } from "@hmcts/nodejs-logging";
import { test } from "../../../fixtures/fixtures.ts";
import { config } from "../../../config.ts";
import { Helpers } from "../../../common/helpers.ts";
import { Events } from "../../../common/types.ts";
import {
  createSolicitorTestCase,
  setUsersCaseToState,
} from "../../../helper/case-update/progress-case";
import { solicitorCreateCase } from "../../fixtures/solicitorCreateCase.ts";
import { State } from "../../../helper/case/definition";
import { CommonContent } from "../../../common/commonContent.ts";

const logger = Logger.getLogger("caseworker-notes-logger");

test.use({
  storageState: config.users.caseworker.sessionFile,
});

test.describe("Caseworker notes tests", (): void => {
  test.beforeEach(async ({ page }) => {
    const userCase = await createSolicitorTestCase(solicitorCreateCase);
    await setUsersCaseToState(userCase.id, State.Holding);

    await Helpers.goToCase(
      page,
      config.urls.manageCaseBaseUrl,
      userCase.id,
      "Summary"
    );
  });

  test("Create a note and later remove it from the case", async ({
    page,
    addNotePage,
    removeNotePage,
    checkYourAnswersAndSubmitPage,
    notesTab,
  }): Promise<void> => {
    logger.info("Adding case note");
    await Helpers.chooseEventFromDropdown(page, Events.addNote);
    await addNotePage.caseworkerAddNote();
    await checkYourAnswersAndSubmitPage.checkYourAnswers(
      CommonContent.saveAndContinue
    );

    logger.info("Viewing added case note in notes tab");
    await notesTab.viewNoteInTab();

    logger.info("Removing case note");
    await Helpers.chooseEventFromDropdown(page, Events.removeNote);
    await removeNotePage.caseworkerRemoveNote();
    await checkYourAnswersAndSubmitPage.checkYourAnswers(
      CommonContent.saveAndContinue
    );

    logger.info("Viewing empty notes tab");
    await notesTab.viewEmptyTab();
  });
});
