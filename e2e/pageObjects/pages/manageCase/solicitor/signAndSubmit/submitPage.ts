import { Page, expect, type Locator } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonContent } from "../../../../../common/commonContent.ts";
import { AccessibilityOptions } from "../../../../types.ts";
import { BaseJourneyPage } from "../../../common/baseJourneyPage.ts";
import { SubmitContent } from "../constants/signAndSubmitContent.ts";

export class SignAndSubmitSubmitPage extends BaseJourneyPage {
  private readonly h2CheckAnswers: Locator;
  private readonly orderSummaryDiv: Locator;
  private readonly feeCodeCell: Locator;
  private readonly feeItems: Locator;
  private readonly yesTexts: Locator;
  private readonly submitButton: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.h2CheckAnswers = page.locator(
      `${Selectors.h2}:text-is("${SubmitContent.content.h2}")`,
    );
    this.orderSummaryDiv = page.locator(
      `${Selectors.div}:text-is("${SubmitContent.content.div}")`,
    );
    this.feeCodeCell = page.locator(
      `${Selectors.td}:text-is("${SubmitContent.content.feeCode}")`,
    );
    this.feeItems = page
      .locator(`${Selectors.GovukText16}`)
      .filter({ hasText: `${CommonContent.fee}` });
    this.yesTexts = page.locator(
      `${Selectors.GovukText16}:text-is("${CommonContent.Yes}")`,
    );
    this.submitButton = page.locator(
      `${Selectors.button}:text-is("${CommonContent.submitApplication}")`,
    );
  }

  public async signAndSubmitSubmitPage({
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
    await this.assertPageHeading(SubmitContent.content.pageTitle);
    const answers = [
      SubmitContent.content.text161,
      SubmitContent.content.text162,
      SubmitContent.content.text163,
      SubmitContent.content.text164,
      SubmitContent.content.text165,
      SubmitContent.content.text166,
      SubmitContent.content.text167,
    ];
    for (const text of answers) {
      await expect(
        this.page.locator(`${Selectors.GovukText16}:text-is("${text}")`),
      ).toBeVisible();
    }
    await Promise.all([
      expect(this.h2CheckAnswers).toBeVisible(),
      expect(this.orderSummaryDiv).toBeVisible(),
      expect(this.feeCodeCell).toBeVisible(),
      expect(this.feeItems).toHaveCount(3),
    ]);
    await expect(this.yesTexts).toHaveCount(5);
  }

  private async fillInFields(): Promise<void> {
    await this.submitButton.click();
  }
}
