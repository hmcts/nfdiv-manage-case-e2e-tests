import { Page, type Locator } from "@playwright/test";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { config } from "../../../../../config";

export class PrepareEmailAttachmentsPage extends BaseJourneyPage {
  private readonly addNewButton: Locator;
  private readonly uploadedDocsHeading: Locator;
  private readonly fileInput: Locator;

  constructor(page: Page) {
    super(page);
    this.addNewButton = page.getByRole("button", {
      name: CommonContent.addNewButton,
      exact: true,
    });
    this.uploadedDocsHeading = page.getByRole("heading", {
      name: "Add attachments",
      exact: true,
    });
    this.fileInput = page.locator(
      "#generalEmailAttachments_0_documentLink",
    );
  }

  public async prepareEmailAttachments(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    await this.page
      .getByRole("heading", {
        name: "Prepare general email attachments",
        exact: true,
      })
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.addNewButton.click();
    await this.uploadedDocsHeading.waitFor();
    await this.fileInput.setInputFiles(config.files.pdf);
    await this.clickContinue();
  }
}
