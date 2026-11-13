import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

const marriageDate = "01/10/2016";

export class MarriageCertificateDetailsPage extends BaseJourneyPage {
  private readonly marriageDateDay: Locator;
  private readonly marriageDateMonth: Locator;
  private readonly marriageDateYear: Locator;
  private readonly marriedInUkYes: Locator;

  constructor(page: Page) {
    super(page);
    this.marriageDateDay = page.getByRole("textbox", { name: "Day" });
    this.marriageDateMonth = page.getByRole("textbox", { name: "Month" });
    this.marriageDateYear = page.getByRole("textbox", { name: "Year" });
    this.marriedInUkYes = page.getByRole("radio", { name: "Yes" });
  }

  public async marriageCertificateDetails(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.pageTitle);
    await this.marriageDateDay.waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.marriedInUkYes.check();
    const [day, month, year] = marriageDate.split("/");
    await this.marriageDateDay.fill(day);
    await this.marriageDateMonth.fill(month);
    await this.marriageDateYear.fill(year);
    await this.marriageDateYear.blur();
    await this.clickContinue();
  }
}
