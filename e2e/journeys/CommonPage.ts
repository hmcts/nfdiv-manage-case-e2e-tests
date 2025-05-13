import {Page} from "@playwright/test";
import Config from "../config.ts";

export class CommonPage {

  public static async navigateToCreateCasePage(page: Page): Promise<void> {
    await page.goto(Config.manageCasesBaseURLCase + "/case-filter");
  }
}
