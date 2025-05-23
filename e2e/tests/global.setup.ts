import { test as setup } from "./fixtures";

setup(
  "Setup case manager user",
  async ({ page, config, idamPage, SessionUtils }) => {
    const user = config.users.solicitor;
    if (SessionUtils.isSessionValid(user.sessionFile, user.cookieName!)) return;
    await page.goto(config.urls.manageCaseBaseUrl);
    await idamPage.login(user);
  }
);

setup(
  "Setup judge user",
  async ({ page, config, idamPage, SessionUtils }) => {
    const user = config.users.caseworker;
    if (SessionUtils.isSessionValid(user.sessionFile, user.cookieName!)) return;
    await page.goto(config.urls.manageCaseBaseUrl);
    await idamPage.login(user);
  }
);

setup(
  "Setup judge user",
  async ({ page, config, idamPage, SessionUtils }) => {
    const user = config.users.legalAdvisor;
    if (SessionUtils.isSessionValid(user.sessionFile, user.cookieName!)) return;
    await page.goto(config.urls.manageCaseBaseUrl);
    await idamPage.login(user);
  }
);
