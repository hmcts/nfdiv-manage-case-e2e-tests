import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class HowDoYouWantToApplyForDivorcePage extends BaseJourneyPage {
  private readonly divorceRadio: Locator;
  private readonly soleApplicationRadio: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.divorceRadio = page.getByLabel("Divorce");
    this.soleApplicationRadio = page.getByLabel("Sole Application");
  }

  public async createApplicationTypePage(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.divorceRadio.check();
    await this.soleApplicationRadio.waitFor();
    await this.soleApplicationRadio.check();
    await this.clickContinue();
  }
}
