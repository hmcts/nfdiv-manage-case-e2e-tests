import { BaseJourneyPage } from "../../../../common/baseJourneyPage.ts";

export class ConfirmStatusPage extends BaseJourneyPage {
  public async confirmActiveStatus(): Promise<void> {
    await this.page.getByRole("radio", { name: /^Active$/i }).first().check();
    await this.clickSubmit();
  }
}

