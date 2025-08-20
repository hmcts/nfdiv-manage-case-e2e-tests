import { test } from "../../../fixtures.ts";
import {CreateCase} from "../../../../journeys/manageCases/createCase/solicitorCreateCase.ts";
import {config} from "../../../../config.ts";
import {
  SolicitorPayment
} from "../../../../pageObjects/pages/manageCase/solicitor/signAndSubmit/applicationSolPaymentPage.ts";

test.describe("Solicitor create application tests", (): void => {

  test.use({
    storageState: config.users.solicitor.sessionFile,
  });

  test(`Log in as a solicitor and start creating a:
  Accessibility testing,
  Error message testing,
  saying yes to all options, @nightly @regression @smoke `, async ({
    page,
    axeUtils
  }): Promise<void> => {
    await CreateCase.createCase({
      page: page,
      accessibility: true,
      axeUtil: axeUtils,
      solicitorPayment: SolicitorPayment.PBA
    });
  });
});
