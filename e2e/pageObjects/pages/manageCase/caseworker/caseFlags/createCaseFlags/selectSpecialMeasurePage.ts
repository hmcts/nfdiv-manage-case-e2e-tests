import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class SelectSpecialMeasurePage extends BaseJourneyPage {
  public async selectScreeningWitness(): Promise<void> {
    await this.page.getByRole("radio", { name: content.SCREENING_WITNESS }).first().click();
    await this.clickContinue()
  }
}

