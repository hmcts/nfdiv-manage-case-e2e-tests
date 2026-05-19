import {test} from "../../../../fixtures/fixtures";
import {config} from "../../../../config";
import {completeCase} from '../../../fixtures/completeCase';

import {setUsersCaseToState} from "../../../../helper/case-update/progress-case";
import {State} from "../../../../helper/case/definition";

test.describe("Solicitor create application tests", (): void => {
  test.use({
    storageState: config.users.solicitor.sessionFile,
  });

  test(`Log in as a solicitor and start creating a case:
  Accessibility testing,
  Error message testing,
  saying yes to all options, @nightly @regression @smoke`, async ({
  }): Promise<void> => {

    await setUsersCaseToState(completeCase, State.Holding);
  });
});
