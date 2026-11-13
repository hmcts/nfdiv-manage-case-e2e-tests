import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class JurisdictionApplyForDivorceOrDissolutionPage extends BaseJourneyPage {
  private readonly jurisdictionFirstCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.jurisdictionFirstCheckbox = page.getByRole("checkbox", {
      name: "Both parties to the marriage or civil partnership are habitually resident in England and Wales",
    });
  }

  public async jurisdictionConnection(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.jurisdictionFirstCheckbox.check();
    await this.clickContinue();
  }
}
