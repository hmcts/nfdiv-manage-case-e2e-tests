import {Page} from "@playwright/test";
import {Selectors} from "../common/selectors.ts";
import Config from "../config.ts";
import {CommonContent} from "../fixtures/CommonContent.ts";

interface CaseCreationUrlParams {
  paths: string[];
  eventId: string;
  queryParams?: string;
  pageId: string
}

export class CommonPage {

  public static async navigateToCreateCasePage(page: Page): Promise<void> {
    await page.goto(Config.manageCasesBaseURLCase + "/case-filter");
  }

  public static async navigateToPage(page: Page, baseUrl: string, eventId: string, pageId: string): Promise<void> {
      await page.goto([baseUrl, eventId, pageId].join('/'));
  }
}
