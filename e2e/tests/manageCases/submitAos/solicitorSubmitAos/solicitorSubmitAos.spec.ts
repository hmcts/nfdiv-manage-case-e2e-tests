import {test} from "../../../../fixtures/fixtures";
import {config} from "../../../../config";
import {completeCase} from '../../../fixtures/completeCase';

import {createSolicitorTestCase, setUsersCaseToState} from "../../../../helper/case-update/progress-case";
import {State} from "../../../../helper/case/definition";

test.describe("Solicitor submit Aos tests", (): void => {
  test.use({
    storageState: config.users.solicitor.sessionFile,
  });

  test(`Log in as a solicitor and submit Aos on a case:
  Accessibility testing,
  Error message testing,
  saying yes to all options, @nightly @regression @smoke`, async ({
  }): Promise<void> => {

    const userCase = (await createSolicitorTestCase(completeCase));
    await setUsersCaseToState(userCase.id, State.Holding);
  });
});
