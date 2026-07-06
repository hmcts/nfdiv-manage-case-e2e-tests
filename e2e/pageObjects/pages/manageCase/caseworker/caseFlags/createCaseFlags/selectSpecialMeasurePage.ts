import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";

export class SelectSpecialMeasurePage extends BaseJourneyPage {
  public async selectScreeningWitness(): Promise<void> {
    await this.page.getByRole("radio", { name: /Screening witness from accused/i }).first().click();
    await this.clickSubmit();
  }
}

