import {
  expect,
  Locator,
  Page,
} from "@playwright/test";
import {Events} from "./types";
import {Selectors} from "./selectors.ts";

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
}
