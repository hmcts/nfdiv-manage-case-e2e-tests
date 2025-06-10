import {IdamPage} from "@hmcts/playwright-common";
import {Page} from "@playwright/test";

export interface PageFixtures {
  determinePage: Page;
  idamPage: IdamPage;
}

export const pageFixtures = {
  determinePage: async ({ page, lighthousePage }, use, testInfo) => {
    if (testInfo.tags.includes("@performance")) {
      await use(lighthousePage);
    } else {
      await use(page);
    }
  },
  idamPage: async ({ determinePage }, use) => {
    await use(new IdamPage(determinePage));
  },
};
