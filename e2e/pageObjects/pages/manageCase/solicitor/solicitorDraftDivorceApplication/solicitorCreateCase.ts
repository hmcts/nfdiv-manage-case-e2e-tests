import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class SolicitorCreatePage extends BaseJourneyPage {
  private readonly jurisdictionSelect: Locator;
  private readonly caseTypeSelect: Locator;
  private readonly eventSelect: Locator;
  private readonly goButton: Locator;

  constructor(page: Page) {
    super(page);
    this.jurisdictionSelect = page.getByLabel('Jurisdiction');
    this.caseTypeSelect = page.getByLabel('Case type');
    this.eventSelect = page.getByLabel('Event');
    this.goButton = page.getByRole("button", {
      name: "Start",
    });
  }

  public async solicitorCreatePage(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.page
      .getByRole("heading", {
        name: CommonContent.createCase,
        exact: true,
      })
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
