import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";

export class SolicitorCreatePage extends BaseJourneyPage {
  private readonly jurisdictionSelect: Locator;
  private readonly caseTypeSelect: Locator;
  private readonly eventSelect: Locator;
  private readonly goButton: Locator;

  constructor(page: Page) {
    super(page);
    this.jurisdictionSelect = page.locator("#cc-jurisdiction");
    this.caseTypeSelect = page.locator("#cc-case-type");
    this.eventSelect = page.locator("#cc-event");
    this.goButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.button}")`,
    );
  }

  public async solicitorCreatePage(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.page
      .locator(
        `${Selectors.GovukHeadingXL}:text-is("${CommonContent.createCase}")`,
      )
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.jurisdictionSelect.selectOption(
      CommonContent.jurisdictionOption,
    );
    await this.caseTypeSelect.selectOption(CommonContent.caseTypeOption);
    const eventOptions = await this.eventSelect.evaluate(
      (el: HTMLSelectElement) => Array.from(el.options).map((o) => o.value),
    );
    if (eventOptions.length <= 1) {
      console.log("Event dropdown failed to load, retrying...");
      await this.page.reload();
      await this.fillInFields();
    }

    await this.eventSelect.selectOption(CommonContent.pageTitle);
    await this.goButton.click();
  }
}
