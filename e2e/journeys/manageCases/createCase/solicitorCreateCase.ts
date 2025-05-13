import {Page} from "@playwright/test";
import Config from "../../../config.ts";
import {SolicitorCreateCaseStart} from "./solicitor/solicitorCreateCase/solicitorCreateCaseStart.ts";
import idamLoginHelper from "../../../common/userHelpers/idamLoginHelper.ts";
import {HowDoYouWantToApplyForDivorce} from "./solicitor/solicitorCreateCase/howDoYouWantToApplyForDivorce.ts";
import {UserRole} from "../../../common/types.ts";
import {SolAboutTheSolicitor} from "./solicitor/solicitorCreateCase/solAboutTheSolicitor.ts";
import {MarriageBrokenDownIrretrievably} from "./solicitor/solicitorCreateCase/marriageBrokenDownIrretrievably.ts";
import {AboutApplicant} from "./solicitor/solicitorCreateCase/aboutApplicant.ts";
import {AboutRespondentOrAppTwo} from "./solicitor/solicitorCreateCase/aboutRespondentOrAppTwo.ts";
import {ApplicantTwoServiceDetails} from "./solicitor/solicitorCreateCase/applicantTwoServiceDetails.ts";
import {MarriageCertificateDetails} from "./solicitor/solicitorCreateCase/marriageCertificateDetails.ts";
import {
  JurisdictionApplyForDivorceOrDissolution
} from "./solicitor/solicitorCreateCase/jurisdictionApplyForDivorceOrDissolution.ts";
import {OtherLegalProceedings} from "./solicitor/solicitorCreateCase/otherLegalProceedings.ts";
import {FinancialOrders} from "./solicitor/solicitorCreateCase/financialOrders.ts";
import {UploadSupportingDocuments} from "./solicitor/solicitorCreateCase/uploadSupportingDocuments.ts";
import {CheckYourAnswersAndSubmit} from "./solicitor/solicitorCreateCase/checkYourAnswersAndSubmit.ts";

interface CreateCaseOptions {
  page: Page;
  accessibilityTest: boolean;
  caseType: string;
  user: UserRole;
}

export class CreateCase {
  public static async createCase({
                                   page,
                                   accessibilityTest,
                                   caseType,
                                   user
                                 }: CreateCaseOptions): Promise<void> {

    await SolicitorCreateCaseStart.solicitorCreateCase({
      page: page,
      accessibilityTest: accessibilityTest,
      caseType: caseType,
      user: user
    });
    await HowDoYouWantToApplyForDivorce.applicationType({page: page});
    await SolAboutTheSolicitor.solAboutTheSolicitor({page: page});
    await MarriageBrokenDownIrretrievably.marriageBrokenDown({page: page});
    await AboutApplicant.aboutApplicant({page: page});
    await AboutRespondentOrAppTwo.aboutRespondentOrAppTwo({page: page});
    await ApplicantTwoServiceDetails.applicantTwoServiceDetails({page: page});
    await MarriageCertificateDetails.marriageCertificateDetails({page: page});
    await JurisdictionApplyForDivorceOrDissolution.jurisdictionConnection({page: page});
    await OtherLegalProceedings.otherLegalProceedings({page: page});
    await FinancialOrders.financialOrders({page: page});
    await UploadSupportingDocuments.uploadSupportingDocuments({page: page});
    await CheckYourAnswersAndSubmit.checkYourAnswers({page: page});
  }
}
