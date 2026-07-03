import { Logger } from '@hmcts/nodejs-logging';
import { test } from "../../../fixtures/fixtures.ts";
import { config } from "../../../config.ts";
import { Helpers } from "../../../common/helpers.ts";
import { Events } from "../../../common/types.ts";
import {createSolicitorTestCase, setUsersCaseToState} from "../../../helper/case-update/progress-case";
import {solicitorCreateCase} from "../../fixtures/solicitorCreateCase.ts";
import {State} from "../../../helper/case/definition";
import { CommonContent } from "../../../common/commonContent.ts";

const logger = Logger.getLogger('caseworker-general-email-logger');

test.use({
  storageState: config.users.caseworker.sessionFile,
});

test.describe("Caseworker general email tests", (): void => {
  test.beforeEach(async ({ page }) => {
    const userCase = (await createSolicitorTestCase(solicitorCreateCase));
    await setUsersCaseToState(userCase.id, State.Holding);

    await Helpers.goToCase(
      page,
      config.urls.manageCaseBaseUrl,
      userCase.id,
      "Summary",
    );
    // await expect(page).toHaveURL(new RegExp(`case-details/${userCase.id}#Summary`));
  });

  test(`Create a general email and later remove it from the case`, async ({
    page,
    prepareEmailAttachmentsPage,
    createGeneralEmailPage,
    removeGeneralEmailsPage,
    checkYourAnswersAndSubmitPage,
    correspondenceTab,
  }): Promise<void> => {
    logger.info("Uploading general email attachments");
    await Helpers.chooseEventFromDropdown(page, Events.prepareEmailAttachments);
    await prepareEmailAttachmentsPage.prepareEmailAttachments();
    await checkYourAnswersAndSubmitPage.checkYourAnswers(CommonContent.saveAndContinue);

    logger.info("Creating general email");
    await Helpers.chooseEventFromDropdown(page, Events.createGeneralEmail);
    await createGeneralEmailPage.caseworkerCreateGeneralEmail();
    await checkYourAnswersAndSubmitPage.checkYourAnswers(CommonContent.saveAndContinue);


    logger.info("Viewing created general email in correspondence tab");
    await correspondenceTab.viewEmailInTab();

    logger.info("Removing general email");
    await Helpers.chooseEventFromDropdown(page, Events.removeGeneralEmails);
    await removeGeneralEmailsPage.caseworkerRemoveGeneralEmails();
    await checkYourAnswersAndSubmitPage.checkYourAnswers(CommonContent.saveAndContinue);

    logger.info("Viewing empty correspondence tab");
    await correspondenceTab.viewEmptyTab();
  });
});
