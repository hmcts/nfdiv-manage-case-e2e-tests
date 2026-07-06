import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";

export class SelectFlagLevel extends BaseJourneyPage {
  public async selectCaseLevel(): Promise<void> {
    await this.page.getByRole("radio", { name: /Case level/i }).last().click();
    await this.clickSubmit();
  }

  public async selectPartyLevel(): Promise<void> {
    await this.page.getByRole("radio", { name: /applicant or applicant1/i }).first().click();
    await this.clickSubmit();
  }
}

