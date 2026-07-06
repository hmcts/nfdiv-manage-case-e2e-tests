import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class SelectSpecialMeasurePage extends BaseJourneyPage {
  public async selectScreeningWitness(): Promise<void> {
    const screeningWitnessRegex = new RegExp(`${content.SCREENING_WITNESS}`, "i");
    await this.page.getByRole("radio", { name: screeningWitnessRegex }).first().click();
    await this.clickSubmit();
  }
}

