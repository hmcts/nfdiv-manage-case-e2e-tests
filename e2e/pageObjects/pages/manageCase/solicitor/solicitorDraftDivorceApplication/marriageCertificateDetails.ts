import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { MarriageCertificateDetailsContent } from "../constants/solicitorDraftDivorceApplicationContent.ts";

export class MarriageCertificateDetailsPage extends BaseJourneyPage {
  private readonly marriageDateDay: Locator;
  private readonly marriageDateMonth: Locator;
  private readonly marriageDateYear: Locator;
  private readonly marriedInUkYes: Locator;

  constructor(page: Page) {
    super(page);
    this.marriageDateDay = page.locator(
      MarriageCertificateDetailsContent.selectors.textBoxes.marriageDateDay,
    );
    this.marriageDateMonth = page.locator(
      MarriageCertificateDetailsContent.selectors.textBoxes.marriageDateMonth,
    );
    this.marriageDateYear = page.locator(
      MarriageCertificateDetailsContent.selectors.textBoxes.marriageDateYear,
    );
    this.marriedInUkYes = page.locator(
      MarriageCertificateDetailsContent.selectors.radioButtons
        .marriageMarriedInUkYes,
    );
  }

  public async marriageCertificateDetails(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.marriedInUkYes.check();
    const [day, month, year] =
      MarriageCertificateDetailsContent.content.marriageDate.split("/");
    await this.marriageDateDay.fill(day);
    await this.marriageDateMonth.fill(month);
    await this.marriageDateYear.fill(year);
    await this.marriageDateYear.blur();
    await this.clickContinue();
  }
}
