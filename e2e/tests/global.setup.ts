import { test as setup } from "../fixtures/fixtures.ts";

setup(
  "Setup solicitor user",
  async ({ page, config, idamPage, SessionUtils, cookieUtils }) => {
    const user = config.users.solicitor;
    if (SessionUtils.isSessionValid(user.sessionFile, user.cookieName!)) return;
    await page.goto(config.urls.manageCaseBaseUrl);
    await idamPage.login(user);
    await cookieUtils.addAnalyticsCookie(config.users.solicitor);
  },
);

setup(
  "Setup caseworker user",
  async ({ page, config, idamPage, SessionUtils, cookieUtils }) => {
    const user = config.users.caseworker;
    if (SessionUtils.isSessionValid(user.sessionFile, user.cookieName!)) return;
    await page.goto(config.urls.manageCaseBaseUrl);
    await idamPage.login(user);
    await cookieUtils.addAnalyticsCookie(config.users.caseworker);
  },
);

setup(
  "Setup legal advisor user",
  async ({ page, config, idamPage, SessionUtils, cookieUtils }) => {
    const user = config.users.legalAdvisor;
    if (SessionUtils.isSessionValid(user.sessionFile, user.cookieName!)) return;
    await page.goto(config.urls.manageCaseBaseUrl);
    await idamPage.login(user);
    await cookieUtils.addAnalyticsCookie(config.users.legalAdvisor);
  },
);
