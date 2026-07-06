import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";
import { caseFlagsCommonContent as content } from "../../constants/caseworkerCaseFlagsContent.ts";

export class ConfirmStatusPage extends BaseJourneyPage {
  public async confirmActiveStatus(): Promise<void> {
    const activeRegex = new RegExp(`${content.ACTIVE}`, "i");
    await this.page.getByRole("radio", { name: activeRegex }).first().check();
    await this.clickSubmit();
  }
}

