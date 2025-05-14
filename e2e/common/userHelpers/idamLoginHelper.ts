import {expect, Page} from "@playwright/test";
import Config from "../../config.ts";
import {UserLoginInfo} from "../types.ts";

export class IdamLoginHelper {
  private static fields: UserLoginInfo = {
    username: "#username",
    password: "#password",
  };
  private static submitButton = 'input[value="Sign in"]';

  public static async signIn(
    page: Page,
    username: string,
    password: string,
    application: string,
    userType: string,
  ): Promise<void> {

    if (!page.url().includes("idam-web-public.")) {
      await page.goto(application);
    }
    if (page.url().includes("demo")) {
      await page.waitForSelector(`#skiplinktarget:text("Sign in")`);
    } else {
      await page.waitForSelector(
        `#skiplinktarget:text("Sign in or create an account")`,
      );
    }

    await page.fill(this.fields.username, username);
    await page.fill(this.fields.password, password);
    await page.click(this.submitButton);

    await expect
      .poll(() => !page.url().includes("idam-web-public."), {
        intervals: [1_000],
        timeout: 100_000,
        message: `Unable to sign in as ${userType} user`,
      })
      .toBeTruthy();
  }

  public static async signInLongLivedUser(
    page: Page,
    user: keyof typeof Config.userCredentials,
    application: string,
  ): Promise<void> {
    const userCredentials = Config.getUserCredentials(user);
    if (!userCredentials) return;

    await this.signIn(
      page,
      userCredentials.email,
      userCredentials.password,
      application,
      user,
    );
  }
}

export default IdamLoginHelper;
