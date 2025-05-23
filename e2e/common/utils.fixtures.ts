import {
  SessionUtils,
} from "@hmcts/playwright-common";
import { Config, config } from "../config.ts";


export interface UtilsFixtures {
  config: Config;
  SessionUtils: typeof SessionUtils;
}

export const utilsFixtures = {
  config: async ({}, use) => {
    await use(config);
  },
  SessionUtils: async ({}, use) => {
    await use(SessionUtils);
  }
}
