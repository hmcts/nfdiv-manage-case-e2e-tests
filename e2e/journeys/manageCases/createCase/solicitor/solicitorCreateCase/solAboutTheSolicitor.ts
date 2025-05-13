import {Page} from "@playwright/test";
import {SolAboutTheSolicitorPage} from "../../../../../pages/manageCase/solicitorCreateCase/solAboutTheSolicitor.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class SolAboutTheSolicitor {
  public static async solAboutTheSolicitor({
     page,
  }: SolicitorCreateCaseOptions): Promise<string> {

    await SolAboutTheSolicitorPage.solAboutTheSolicitor(page, false);
  }
}
