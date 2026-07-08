import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class SelectFlagLevel extends BaseJourneyPage {
  public async selectCaseLevel(): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.page.getByRole("radio", { name: content.CASE_LEVEL }).last().click();
    await this.clickContinue()
  }

  public async selectPartyLevel(): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.page.getByRole("radio", { name: content.APP_OR_APP_1 }).first().click();
    await this.clickContinue()
  }
}

