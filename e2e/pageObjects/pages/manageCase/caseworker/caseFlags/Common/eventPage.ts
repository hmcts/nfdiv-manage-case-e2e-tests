import { Helpers } from "../../../../../../common/helpers.ts";
import { Events } from "../../../../../../common/types.ts";
import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";

export class EventPage extends BaseJourneyPage {
  public async startCreateFlagsEvent(): Promise<void> {
    await Helpers.chooseEventFromDropdown(this.page, Events.createFlags);
  }

  public async startManageFlagsEvent(): Promise<void> {
    await Helpers.chooseEventFromDropdown(this.page, Events.manageFlags);
  }

  public async runPrepareForCaseFlagsEvent(): Promise<void> {
    await Helpers.chooseEventFromDropdown(this.page, Events.prepareForCaseFlags);
    await this.clickSaveAndContinue()
  }
}

