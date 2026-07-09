import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class SelectFlagLevel extends BaseJourneyPage {
  public async selectCaseLevel(): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.page.getByRole("radio", { name: content.caseLevel }).last().click();
    await this.clickContinue()
  }

  public async selectPartyLevel(): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.page.getByRole("radio", { name: content.appOrApp1 }).first().click();
    await this.clickContinue()
  }
}

