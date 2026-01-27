import { test as baseTest } from "@playwright/test";
import { utilsFixtures, UtilsFixtures } from "./utils.fixtures.ts";
import { pageFixtures, PageFixtures } from "./page.fixtures.ts";
import getPort from "get-port";

// Combine your fixtures into one type
export type CustomFixtures = PageFixtures & UtilsFixtures;

// Create test with just the fixtures you want
export const test = baseTest.extend<CustomFixtures, { lighthousePort: number }>(
  {
    ...pageFixtures,
    ...utilsFixtures,
    // Worker scoped fixtures need to be defined separately
    lighthousePort: [
      async ({}, use) => {
        const port = await getPort();
        await use(port);
      },
      { scope: "worker" },
    ],
  },
);
