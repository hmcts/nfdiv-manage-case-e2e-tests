import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class SelectFlagPage extends BaseJourneyPage {
  public async selectComplexCase(): Promise<void> {
    await this.page.getByRole("radio", { name: content.complexCase }).first().click();
    await this.clickContinue()
  }

  public async selectSpecialMeasure(): Promise<void> {
    await this.page.getByRole("radio", { name: content.specialMeasure }).first().click();
    await this.clickContinue()
  }
}

