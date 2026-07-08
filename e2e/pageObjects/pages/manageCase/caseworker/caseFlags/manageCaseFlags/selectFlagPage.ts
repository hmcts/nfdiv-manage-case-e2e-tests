import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class SelectFlagPage extends BaseJourneyPage {
  public async selectComplexCase(): Promise<void> {
    await this.page.getByRole("radio", { name: content.COMPLEX_CASE }).first().click();
    await this.clickContinue()
  }

  public async selectSpecialMeasure(): Promise<void> {
    await this.page.getByRole("radio", { name: content.SPECIAL_MEASURE }).first().click();
    await this.clickContinue()
  }
}

