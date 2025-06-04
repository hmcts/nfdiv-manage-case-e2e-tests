import {
  expect,
  Locator,
  Page,
} from "@playwright/test";

export class Helpers {
  public static async chooseEventFromDropdown(
    page: Page,
    chosenEvent: string,
  ): Promise<void> {
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("#next-step")).toBeVisible();
    await page.selectOption("#next-step", chosenEvent);
    const goButton: Locator = page.getByRole("button", { name: "Go" });
    await expect(goButton).toBeEnabled();
    await expect
      .poll(
        async () => {
          const goButtonStillVisible = await goButton.isVisible();
          if (goButtonStillVisible) await goButton.click();
          return goButtonStillVisible;
        },
        {
          intervals: [1_000, 2_000, 10_000],
          timeout: 60_000,
        },
      )
      .toBeFalsy();
  }
}
