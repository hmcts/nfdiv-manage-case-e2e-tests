import { test as setup } from "@playwright/test";
import dotenv from "dotenv";
import IdamLoginHelper from "../common/userHelpers/idamLoginHelper.ts";
import config from "../config";

dotenv.config();

setup("Setup judge user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "solicitor",
    config.manageCasesBaseURLCase,
  );
});

setup("Setup case manager user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "caseworker",
    config.manageCasesBaseURLCase,
  );
});

setup("Setup caseWorker user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "legalAdvisor",
    config.manageCasesBaseURLCase,
  );
});
