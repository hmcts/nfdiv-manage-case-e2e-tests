import {Page} from "@playwright/test";
import {FinancialOrdersPage} from "../../../../../pages/manageCase/solicitorCreateCase/financialOrders.ts";

interface SolicitorCreateCaseOptions {
  page: Page;
}

export class FinancialOrders {
  public static async financialOrders({
     page,
  }: SolicitorCreateCaseOptions): Promise<string> {

    await FinancialOrdersPage.financialOrders(page, false);
  }
}
