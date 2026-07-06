import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class SelectFlagPage extends BaseJourneyPage {
  public async selectComplexCase(): Promise<void> {
    const complexCaseRegex = new RegExp(`${content.COMPLEX_CASE}`, "i");
    await this.page.getByRole("radio", { name: complexCaseRegex }).first().click();
    await this.clickSubmit();
  }

  public async selectSpecialMeasure(): Promise<void> {
    const specialMeasureRegex = new RegExp(`${content.SPECIAL_MEASURE}`, "i");
    await this.page.getByRole("radio", { name: specialMeasureRegex }).first().click();
    await this.clickSubmit();
  }
}

