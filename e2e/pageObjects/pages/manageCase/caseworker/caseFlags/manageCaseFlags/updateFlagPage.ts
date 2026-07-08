import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { updateFlagPageContent as content} from "../../constants/caseworkerCaseFlagsContent.ts";

export class updateFlagPage extends BaseJourneyPage {
  public async setFlagInactive(reason: string): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.page.getByRole("radio", { name: content.INACTIVE }).first().check();
    await this.page.locator(content.selectors.textarea.flagStatusReasonChange).fill(reason);
    await this.clickContinue()
  }
}

