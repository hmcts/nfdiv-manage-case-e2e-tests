import {IdamPage} from "@hmcts/playwright-common";

export interface PageFixtures {
  idamPage: IdamPage;
}

export const pageFixtures = {
  idamPage: async ({ determinePage }, use) => {
    await use(new IdamPage(determinePage));
  },
};
