import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class SelectFlagLevel extends BaseJourneyPage {
  public async selectCaseLevel(): Promise<void> {
    const caseLevelRegex = new RegExp(`${content.CASE_LEVEL}`, "i");
    await this.page.getByRole("radio", { name: caseLevelRegex }).last().click();
    await this.clickSubmit();
  }

  public async selectPartyLevel(): Promise<void> {
    const appOrApp1Regex = new RegExp(`${content.APP_OR_APP_1}`, "i");
    await this.page.getByRole("radio", { name: appOrApp1Regex }).first().click();
    await this.clickSubmit();
  }
}

