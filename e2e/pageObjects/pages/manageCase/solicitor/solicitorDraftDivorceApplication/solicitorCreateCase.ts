import {Page} from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import {CommonContent} from "../../../../content/CommonContent.ts";

enum fieldIds {
  jurisdiction = "#cc-jurisdiction",
  caseType = "#cc-case-type",
  event = "#cc-event",
}

export class SolicitorCreatePage {
  public static async solicitorCreatePage(
    page: Page,
  ): Promise<void> {

    await this.checkPageLoads(page);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
  ): Promise<void> {
    await page.locator(`${Selectors.GovukHeadingXL}:text-is("${CommonContent.createCase}")`,).waitFor();
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {
    await page.selectOption(fieldIds.jurisdiction, CommonContent.jurisdictionOption);
    await page.selectOption(fieldIds.caseType, CommonContent.caseTypeOption);
    // If event dropdown fails to load then fail the test fast - interim solution until the underlying problem is fixed
    const eventDropdown = page.locator(fieldIds.event);
    const eventOptions = await eventDropdown.evaluate((el: HTMLSelectElement) =>
      Array.from(el.options).map((option) => option.value),
    );
    if (eventOptions.length <= 1) {
      console.log("Event dropdown failed to load, retrying...");
      await page.reload();
      await this.fillInFields(page);
    }

    await page.selectOption(fieldIds.event, CommonContent.pageTitle);

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.button}")`,
    );
  }
}
