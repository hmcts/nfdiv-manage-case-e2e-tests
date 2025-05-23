import {Page} from "@playwright/test";
import {Selectors} from "../../../../common/selectors.ts";
import {CommonContent} from "../../../content/CommonContent.ts";
import {config} from "../../../../config.ts";

export class UploadSupportingDocumentsPage {

  public static async uploadSupportingDocuments(
    page: Page,
  ): Promise<void> {

    await this.checkPageLoads(page);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
  ): Promise<void> {
    await page.locator(`${Selectors.GovukCaptionL}:text-is("${CommonContent.pageTitle}")`,).waitFor();
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.addNewButton}")`,
    );

    await page.locator('h3:text("Applicant 1 uploaded documents")').waitFor();
    const fileInput = page.locator('#applicant1DocumentsUploaded_0_documentLink');
    await fileInput.setInputFiles(config.files.pdf);

    await page.click(
      `${Selectors.button}:text-is("${CommonContent.continueButton}")`,
    );
  }
}
