import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class ConfirmStatusPage extends BaseJourneyPage {
  public async confirmActiveStatus(): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.page.getByRole("radio", { name: content.active }).first().check();
    await this.clickContinue()
  }
}

