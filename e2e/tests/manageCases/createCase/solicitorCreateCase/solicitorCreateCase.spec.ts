import { test } from "@playwright/test";
import { CreateCase } from "../../../../journeys/manageCases/createCase/solicitorCreateCase"
import {config} from "../../../../config.ts";

test.use({
  storageState: config.users.solicitor.sessionFile,
});

test.describe("Solicitor create application tests", (): void => {
  test(`Log in as a solicitor and start creating a:
  Not Accessibility testing,
  Error message testing,
  saying yes to all options, @nightly @regression @smoke`, async ({
                                                                          browser,
                                                                        }): Promise<void> => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await CreateCase.createCase({
      page: page,
    });
    await context.close();
    await browser.close();
  });
});
