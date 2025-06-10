import {expect, Page} from "@playwright/test";
import {UserLoginInfo} from "../types.ts";
import {config} from "../../config.ts";

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
            await page.locator(`#skiplinktarget:text("Sign in")`).waitFor();
        } else {
            await page.locator(`#skiplinktarget:text("Sign in or create an account")`,).waitFor();
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
        user: keyof typeof config.users,
        application: string,
    ): Promise<void> {
        const userCredentials = config.users[user];
        if (!userCredentials) return;

        await this.signIn(
            page,
            userCredentials.username,
            userCredentials.password,
            application,
            user,
        );
    }
}

export default IdamLoginHelper;
