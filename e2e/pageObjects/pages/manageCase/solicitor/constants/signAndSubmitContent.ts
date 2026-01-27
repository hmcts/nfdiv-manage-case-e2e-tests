// Shared constants to eliminate duplication
const SharedValues = {
  pageTitle: "Sign and submit",
  pbaNumber: "PBA0082311",
  paymentReference: "Test",
  solicitorName: "Solicitor_app_test",
  firmName: "NFD Solicitor Firm",
  feeCode: "FEE0002",
} as const;

export const ApplicationSolPayAccountContent = {
  content: {
    pageTitle: SharedValues.pageTitle,
    formLabel1: "Select your account number",
    formLabel2: "Enter your payment reference",
    formHint: "This will appear on your statement to help you identify this payment",
    pbaNumber: SharedValues.pbaNumber,
    reference: SharedValues.paymentReference,
  },
  selectors: {
    accountNumberSelectOption: "#pbaNumbers",
    paymentReferenceTextBox: "#feeAccountReference",
  },
} as const;

export const ApplicationSolPaymentContent = {
  content: {
    pageTitle: "Payment for this application",
    div: "Order Summary",
    td: SharedValues.feeCode,
    formLabel1: "How is payment being made?",
    formLabel2: "Solicitor fee account (PBA)",
    formLabel3: "Help With Fees",
  },
  selectors: {
    radioButtons: {
      pba: "#solPaymentHowToPay-feePayByAccount",
      hwf: "#solPaymentHowToPay-feesHelpWith",
    },
  },
} as const;

export const ApplicationSolPaymentSummaryContent = {
  content: {
    pageTitle: SharedValues.pageTitle,
    paymentMethod: "Payment Method: Fee Account",
    reference: SharedValues.paymentReference,
  },
} as const;

export const ApplicationSolStatementOfTruthContent = {
  content: {
    pageTitle: SharedValues.pageTitle,
    h2_1: "Service method",
    h2_2: "Statement of reconciliation",
    h2_3: "The prayer",
    h2_4: "Statement of truth",
    name: SharedValues.solicitorName,
    firmName: SharedValues.firmName,
  },
  selectors: {
    textBoxes: {
      name: "#solStatementOfReconciliationName",
      firmName: "#solStatementOfReconciliationFirm",
    },
    radioButtons: {
      urgentIssueYes: "#solUrgentCase_Yes",
      courtService: "#serviceMethod-courtService",
      statementOfReconciliationYes: "#solStatementOfReconciliationCertify_Yes",
      statementOfReconciliationDiscussedYes: "#solStatementOfReconciliationDiscussed_Yes",
      thePrayerApplyingToDissolve: "#applicant1PrayerDissolveDivorce-dissolveDivorce",
      factsInApplicationTrue: "#applicant1StatementOfTruth_Yes",
      authorisedToSignStatement: "#solSignStatementOfTruth_Yes",
    },
  },
} as const;

export const SubmitContent = {
  content: {
    pageTitle: SharedValues.pageTitle,
    h2: "Check your answers",
    div: "Order Summary",
    feeCode: SharedValues.feeCode,
    text161: "Court Service",
    text162: "I confirm the applicant is applying to the court to dissolve their marriage (get a divorce)",
    text163: SharedValues.solicitorName,
    text164: SharedValues.firmName,
    text165: "Solicitor fee account (PBA)",
    text166: SharedValues.pbaNumber,
    text167: SharedValues.paymentReference,
  },
} as const;
