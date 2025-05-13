import {
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";

export class Helpers {

  public static async openNewBrowserWindow(
    browser: Browser,
  ): Promise<Page> {
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext();
    return await newContext.newPage();
  }

  public static getFormattedCardExpiryDate(
    month: number,
    year: number,
  ): string {
    return `${String(month).padStart(2, "0")}/${String(year).slice(-2)}`;
  }

  public static async clickCheckbox(page: Page, label: string) {
    await page
      .getByRole("checkbox", {
        name: label,
        exact: true,
      })
      .check();
  }

  public static async clickButton(page: Page, label: string) {
    await page
      .getByRole("button", {
        name: label,
        exact: true,
      })
      .click();
  }

  public static getHyphenatedCaseReference(caseNumber: string): string {
    if (!caseNumber.trim()) {
      throw new Error(
        "Invalid case number: Expected a non-empty 16-digit string.",
      );
    }
    return caseNumber.match(/.{1,4}/g)!.join("-");
  }
}
