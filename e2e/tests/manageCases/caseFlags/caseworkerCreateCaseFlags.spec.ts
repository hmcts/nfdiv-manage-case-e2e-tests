import { test } from "../../../fixtures/fixtures";
import { config } from "../../../config";
import { CaseworkerCaseFlagsPage } from "../../../pageObjects/pages/manageCase/caseworker/caseFlags/caseFlagsPage";
import { createSolicitorTestCase, setUsersCaseToState } from "../../../helper/case-update/progress-case";
import { State } from "../../../helper/case/definition";
import { solicitorCreateCase } from "../../fixtures/solicitorCreateCase";

const CASE_FLAG_NAME_PREFIX = "Case Flag 1";
const PARTY_FLAG_NAME_PREFIX = "App1 Flag";
test.describe("Caseworker creates case flags", (): void => {
  test.use({
    storageState: config.users.caseworker.sessionFile,
  });

  test("create one case-level and one party-level flag for a new case", async ({
    determinePage,
    idamPage,
  }): Promise<void> => {
    const caseFlagsPage = new CaseworkerCaseFlagsPage(determinePage);
    const timestamp = Date.now();
    const caseFlagComment = `${CASE_FLAG_NAME_PREFIX} ${timestamp}`;
    const partyFlagComment = `${PARTY_FLAG_NAME_PREFIX} ${timestamp}`;

    const caseId = await createSubmittedDigitalCase();
    await caseFlagsPage.openCaseDetails(caseId, idamPage);
    await caseFlagsPage.prepareCaseFlags();
    await caseFlagsPage.createCaseAndPartyFlags(caseFlagComment, partyFlagComment);
    await caseFlagsPage.assertFlagsVisible(caseFlagComment, partyFlagComment);
  });
});

async function createSubmittedDigitalCase(): Promise<string> {
  const userCase = (await createSolicitorTestCase(solicitorCreateCase));
  await setUsersCaseToState(userCase.id, State.Submitted);
  return userCase.id;
}
