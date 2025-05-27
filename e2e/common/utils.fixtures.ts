import {
  LighthouseUtils,
  SessionUtils,
} from "@hmcts/playwright-common";
import {config, Config} from "../config.ts";
import path from "path";
import os from "os";
import { chromium } from "playwright/test";
import {Page} from "@playwright/test";
import {CookieUtils} from "./cookite.utils.ts";

export interface UtilsFixtures {
  config: Config;
  cookieUtils: CookieUtils;
  SessionUtils: typeof SessionUtils;
  lighthouseUtils: LighthouseUtils;
  lighthousePage: Page;
}

export const utilsFixtures = {
  config: async ({}, use) => {
    await use(config);
  },
  cookieUtils: async ({}, use) => {
    await use(new CookieUtils());
  },
  SessionUtils: async ({}, use) => {
    await use(SessionUtils);
  },
  lighthousePage: async ({ lighthousePort, page }, use, testInfo) => {
    // Prevent creating performance page if not needed
    if (testInfo.tags.includes("@performance")) {
      // Lighthouse opens a new page and as playwright doesn't share context we need to
      // explicitly create a new browser with shared context
      const userDataDir = path.join(os.tmpdir(), "pw", String(Math.random()));
      const context = await chromium.launchPersistentContext(userDataDir, {
        args: [`--remote-debugging-port=${lighthousePort}`],
      });
      // Using the cookies from global setup, inject to the new browser
      await context.addCookies(
        SessionUtils.getCookies(config.users.solicitor.sessionFile)
      );
      // Provide the page to the test
      await use(context.pages()[0]);
      await context.close();
    } else {
      await use(page);
    }
  },
}
