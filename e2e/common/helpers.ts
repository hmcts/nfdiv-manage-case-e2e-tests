import {
  Browser,
  BrowserContext,
  expect,
  Locator,
  Page,
} from "@playwright/test";
import { Events, UserRole } from "./types";
import { config } from "../config.ts";
import { Selectors } from "./selectors.ts";

export class Helpers {
  public static async chooseEventFromDropdown(
    page: Page,
    chosenEvent: Events,
  ): Promise<void> {
    await page.waitForLoadState("load");
    await expect(page.locator(Selectors.nextStep)).toBeVisible();
    await page.selectOption(Selectors.nextStep, chosenEvent);
    const goButton: Locator = page.getByRole("button", { name: "Go" });
    await expect(goButton).toBeEnabled();
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await expect.poll(
      async () => {
        await delay(1500);
        const stillVisible = await goButton.isVisible();
        if (stillVisible) await goButton.click();
        return stillVisible;
      },
      {
        intervals: [1000, 2000, 5000],
        timeout: 60000,
      }
    ).toBe(false);
  }


  public static async clickButton(page: Page, buttonText: string): Promise<void> {
    const button = page.getByRole("button", { name: buttonText });
    try {
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
      await button.click();
    } catch (error) {
      console.log(`[clickButton with text '${buttonText}' failed`);
      throw error;
    }
  }

  public static async goToCase(
    page: Page,
    baseURL: string,
    caseNumber: string,
    caseTab: string,
  ): Promise<void> {
    try {
      await page.goto(Helpers.generateUrl(baseURL, caseNumber, caseTab));
    } catch (error) {
      console.error("An error occurred while navigating to the case: ", error);
      throw error;
    }
  }

  private static generateUrl(
    baseURL: string,
    caseNumber: string,
    caseTab: string,
  ): string {
    const caseNumberDigits: string = caseNumber.toString().replace(/\D/g, "");
    const base = `${baseURL.replace(/\/$/, "")}/case-details/${caseNumberDigits}`;

    if (!caseTab || !caseTab.trim()) {
      return baseURL;
    }

    const tab = caseTab.trim();
    return `${base}#${encodeURIComponent(tab)}`;
  }

  public static async openNewBrowserWindow(
    browser: Browser,
    user: UserRole,
  ): Promise<Page> {
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: config.users[user as string].sessionFile,
    });
    return await newContext.newPage();
  }
}
