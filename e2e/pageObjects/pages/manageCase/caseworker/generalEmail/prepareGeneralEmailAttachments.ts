import { Page, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonContent } from "../../../../../common/commonContent";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";
import { config } from "../../../../../config";

export class PrepareEmailAttachmentsPage extends BaseJourneyPage {
  private readonly addNewButton: Locator;
  private readonly uploadedDocsHeading: Locator;
  private readonly fileInput: Locator;

  constructor(page: Page) {
    super(page);
    this.addNewButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.addNewButton}")`,
    );
    this.uploadedDocsHeading = page.locator(
      'h3:text("Add attachments")',
    );
    this.fileInput = page.locator(
      "#generalEmailAttachments_0_documentLink",
    );
  }

  public async prepareEmailAttachments(): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
  }

  private async checkPageLoads(): Promise<void> {
    const HEADING_TEXT = "Prepare general email attachments";

    await this.page
      .locator(`${Selectors.GovukHeadingL}:text-is("${HEADING_TEXT}")`,)
      .waitFor();
  }

  private async fillInFields(): Promise<void> {
    await this.addNewButton.click();
    await this.uploadedDocsHeading.waitFor();
    await this.fileInput.setInputFiles(config.files.pdf);
    await this.clickContinue();
  }
}
