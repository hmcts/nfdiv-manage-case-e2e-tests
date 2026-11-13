import { Page, expect, type Locator } from "@playwright/test";
import { AccessibilityOptions } from "../../../../types";
import { BaseJourneyPage } from "../../../common/baseJourneyPage";

const pageCaption = "Sign and submit";
const solicitorName = "Solicitor_app_test";
const firmName = "NFD Solicitor Firm";
const sectionHeadings = [
  "Service method",
  "Statement of reconciliation",
  "The prayer",
  "Statement of truth",
] as const;
const radioSelectors = [
  "#solUrgentCase_Yes",
  "#serviceMethod-courtService",
  "#solStatementOfReconciliationCertify_Yes",
  "#solStatementOfReconciliationDiscussed_Yes",
  "#applicant1PrayerDissolveDivorce-dissolveDivorce",
  "#applicant1StatementOfTruth_Yes",
  "#solSignStatementOfTruth_Yes",
] as const;

export class ApplicationSolStatementOfTruthPage extends BaseJourneyPage {
  private readonly nameInput: Locator;
  private readonly firmInput: Locator;
  private readonly sectionHeadingLocators: Locator[];

  constructor(readonly page: Page) {
    super(page);
    this.sectionHeadingLocators = sectionHeadings.map((name) =>
      page.getByRole("heading", { level: 2, name, exact: true }),
    );
    this.nameInput = page.locator("#solStatementOfReconciliationName");
    this.firmInput = page.locator("#solStatementOfReconciliationFirm");
  }

  public async applicationSolStatementOfTruthPage({
    accessibility,
    axeUtil,
  }: AccessibilityOptions): Promise<void> {
    await this.checkPageLoads();
    await this.fillInFields();
    if (accessibility) {
      await axeUtil.audit();
    }
  }

  private async checkPageLoads(): Promise<void> {
    await this.assertPageCaption(pageCaption);
    await Promise.all([
      ...this.sectionHeadingLocators.map((heading) => expect(heading).toBeVisible()),
    ]);
  }

  private async fillInFields(): Promise<void> {
    for (const selector of radioSelectors) {
      await this.page.locator(selector).click();
    }
    await this.nameInput.fill(solicitorName);
    await this.firmInput.fill(firmName);
    await this.clickContinue();
  }
}
