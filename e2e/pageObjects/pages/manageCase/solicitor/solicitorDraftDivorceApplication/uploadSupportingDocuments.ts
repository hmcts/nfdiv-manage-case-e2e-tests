import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { config } from "../../../../../config";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

export class UploadSupportingDocumentsPage extends BaseJourneyPage {
  private readonly addNewButton: Locator;
  private readonly uploadedDocsHeading: Locator;
  private readonly fileInput: Locator;

  constructor(page: Page) {
    super(page);
    this.addNewButton = page.getByRole("button", {
      name: CommonContent.addNewButton,
    });
    this.uploadedDocsHeading = page.getByRole("heading", {
      name: "Applicant 1 uploaded documents",
      exact: true,
    });
    this.fileInput = page.locator(
      "#applicant1DocumentsUploaded_0_documentLink",
    );
  }

  public async uploadSupportingDocuments(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(CommonContent.pageTitle);
  }

  private async fillInFields(): Promise<void> {
    await this.addNewButton.click();
    await this.uploadedDocsHeading.waitFor();
    await this.fileInput.setInputFiles(config.files.pdf);
    await this.clickContinue();
  }
}
