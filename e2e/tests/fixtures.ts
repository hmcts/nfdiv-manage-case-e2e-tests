import { test as baseTest } from "@playwright/test";
import getPort from "get-port";
import {PageFixtures, pageFixtures} from "../pageObjects/pageFixtures.ts";
import {UtilsFixtures, utilsFixtures} from "../common/utils.fixtures.ts";

export type CustomFixtures = PageFixtures & UtilsFixtures;

// Gather all fixture types into a common type
export const test = baseTest.extend<{ LighthousePort: number }, CustomFixtures>({
  ...pageFixtures,
  ...utilsFixtures,
  LighthousePort: [
    async ({}, use) => {
      const port = await getPort();
      await use(port);
    },
    { scope: 'worker' },
  ],
});
