import { test as setup } from "../fixtures/fixtures";

setup(
  "Setup solicitor user",
  async ({ page, config, idamPage, SessionUtils, cookieUtils }) => {
    const user = config.users.solicitor;
    // eslint-disable-next-line playwright/no-conditional-in-test
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
    // eslint-disable-next-line playwright/no-conditional-in-test
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
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (SessionUtils.isSessionValid(user.sessionFile, user.cookieName!)) return;
    await page.goto(config.urls.manageCaseBaseUrl);
    await idamPage.login(user);
    await cookieUtils.addAnalyticsCookie(config.users.legalAdvisor);
  },
);
