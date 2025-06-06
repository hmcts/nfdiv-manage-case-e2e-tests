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
    await page.waitForLoadState("load");
    await expect(page.locator("#next-step")).toBeVisible({ timeout: 60000});
    await page.selectOption("#next-step", chosenEvent);
    const goButton: Locator = page.getByRole("button", { name: "Go" });
    await expect(goButton).toBeEnabled();
    await expect.poll(
      async () => {
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
}
