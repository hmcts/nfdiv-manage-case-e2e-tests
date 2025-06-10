import {Page} from "@playwright/test";
import {config} from "../config.ts";

export class CommonPage {

    public static async navigateToCreateCasePage(page: Page): Promise<void> {
        await page.goto(config.urls.manageCaseBaseUrl + "/case-filter");
    }
}
