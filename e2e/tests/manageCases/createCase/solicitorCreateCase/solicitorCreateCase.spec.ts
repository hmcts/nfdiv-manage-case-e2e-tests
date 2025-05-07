import { test } from "@playwright/test";
import Config from "../../../../config";
import { CreateCase } from "../../../../journeys/manageCases/createCase/solicitorCreateCase"

test.describe("Solicitor create application tests", (): void => {
  test(`Log in as a solicitor and start creating a:
  Not Accessibility testing,
  Error message testing,
  saying yes to all options, @regression @errorMessage`, async ({
                                                                          page,
                                                                        }): Promise<void> => {
    await CreateCase.createCase({
      page,
      user: "solicitor",
      accessibilityTest: false,
      caseType: 'NFD',
    });
  });
});
