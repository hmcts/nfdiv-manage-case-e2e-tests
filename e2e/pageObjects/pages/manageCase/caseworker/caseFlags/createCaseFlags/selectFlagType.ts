import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";

export class SelectFlagType extends BaseJourneyPage {
  public async selectComplexCase(): Promise<void> {
    await this.page.getByRole("radio", { name: /Complex Case/i }).first().click();
    await this.clickSubmit();
  }

  public async selectSpecialMeasure(): Promise<void> {
    await this.page.getByRole("radio", { name: /Special measure/i }).first().click();
    await this.clickSubmit();
  }
}

