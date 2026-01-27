import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { config } from "../../../../../config.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";

export class UploadSupportingDocumentsPage extends BaseJourneyPage {
  private readonly addNewButton: Locator;
  private readonly uploadedDocsHeading: Locator;
  private readonly fileInput: Locator;

  constructor(page: Page) {
    super(page);
    this.addNewButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.addNewButton}")`,
    );
    this.uploadedDocsHeading = page.locator(
      'h3:text("Applicant 1 uploaded documents")',
    );
    this.fileInput = page.locator(
      "#applicant1DocumentsUploaded_0_documentLink",
    );
  }

  public async uploadSupportingDocuments(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageHeading(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.addNewButton.click();
    await this.uploadedDocsHeading.waitFor();
    await this.fileInput.setInputFiles(config.files.pdf);
    await this.clickContinue();
  }
}
