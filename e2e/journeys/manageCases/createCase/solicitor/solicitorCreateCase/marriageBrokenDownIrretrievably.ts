import {Page} from "@playwright/test";
import {
  MarriageBrokenDownIrretrievablyPage
} from "../../../../../pages/manageCase/solicitorCreateCase/marriageBrokenDownIrretrievably.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class MarriageBrokenDownIrretrievably {
  public static async marriageBrokenDown({
                                           page,
                                         }: SolicitorCreateCaseOptions): Promise<string> {

    await MarriageBrokenDownIrretrievablyPage.marriageBrokenDown(page, false);
  }
}
