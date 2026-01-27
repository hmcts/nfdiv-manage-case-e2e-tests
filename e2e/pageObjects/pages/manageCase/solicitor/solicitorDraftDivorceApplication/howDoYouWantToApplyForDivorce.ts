import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { HowDoYouWantToApplyForDivorceContent } from "../constants/solicitorDraftDivorceApplicationContent.ts";

export class HowDoYouWantToApplyForDivorcePage extends BaseJourneyPage {
  private readonly divorceRadio: Locator;
  private readonly soleApplicationRadio: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.divorceRadio = page.locator(
      HowDoYouWantToApplyForDivorceContent.selectors.radioButtons
        .radioButtonDivorce,
    );
    this.soleApplicationRadio = page.locator(
      HowDoYouWantToApplyForDivorceContent.selectors.radioButtons
        .radioButtonSoleApplication,
    );
  }

  public async createApplicationTypePage(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.divorceRadio.check();
    await this.soleApplicationRadio.waitFor();
    await this.soleApplicationRadio.check();
    await this.clickContinue();
  }
}
