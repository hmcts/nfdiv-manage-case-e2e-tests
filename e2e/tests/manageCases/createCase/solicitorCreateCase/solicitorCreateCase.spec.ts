import { test } from "@playwright/test";
import { CreateCase } from "../../../../journeys/manageCases/createCase/solicitorCreateCase"
import idamLoginHelper from "../../../../common/userHelpers/idamLoginHelper.ts";
import Config from "../../../../config.ts";

test.describe("Solicitor create application tests", (): void => {
  test(`Log in as a solicitor and start creating a:
  Not Accessibility testing,
  Error message testing,
  saying yes to all options, @nightly @regression`, async ({
                                                                          browser,
                                                                        }): Promise<void> => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await idamLoginHelper.signInLongLivedUser(page, 'solicitor', Config.manageCasesBaseURLCase);
    await CreateCase.createCase({
      page: page,
    });
    await context.close();
    await browser.close();
  });
});
