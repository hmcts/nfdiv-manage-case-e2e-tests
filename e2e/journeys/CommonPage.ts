import {Page} from "@playwright/test";
import {Selectors} from "../common/selectors.ts";
import Config from "../config.ts";
import {CommonContent} from "../fixtures/CommonContent.ts";

interface CaseCreationUrlParams {
  paths: string[];
  eventId?: string;
  queryParams?: string;
}

export class CommonPage {
  public static async navigateToPage(baseUrl: string, page: Page, caseCreation: CaseCreationUrlParams): Promise<void> {
    let urlCons: string = this.constructUrl(baseUrl,  caseCreation.paths, caseCreation.eventId);
    console.log(urlCons);
      await page.goto(baseUrl);
  }

  public static async startCreateCaseEvent(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukNavigationLink}:text-is("${CommonContent.createCase}")`,
    );
  }

  private static async constructUrl(baseUrl: string, urlPaths: string[], eventId: string | undefined) : string {
    if (eventId) {
      urlPaths.splice(1, 0, eventId);
    }
    return [baseUrl, ...urlPaths].join('/');
  }
}
