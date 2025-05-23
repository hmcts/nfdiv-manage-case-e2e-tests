import { test as setup } from "@playwright/test";
import dotenv from "dotenv";
import IdamLoginHelper from "../common/userHelpers/idamLoginHelper.ts";
import {config} from "../config.ts";

dotenv.config();

setup("Setup judge user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "solicitor",
    config.urls.manageCaseBaseUrl,
  );
});

setup("Setup case manager user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "caseworker",
    config.urls.manageCaseBaseUrl,
  );
});

setup("Setup caseWorker user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "legalAdvisor",
    config.urls.manageCaseBaseUrl,
  );
});
