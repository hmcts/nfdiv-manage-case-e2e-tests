export interface Address {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  PostTown: string;
  County: string;
  PostCode: string;
  Country: string;
}
export type AddressGlobalUK = Address
export interface BulkScanEnvelope {
  id: string;
  action: string;
}

export interface Document {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
}

export interface CaseData {
  applicationType: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  supplementaryCaseType: SupplementaryCaseType;
  labelContentApplicant2: string;
  labelContentTheApplicant2: string;
  labelContentTheApplicant2UC: string;
  labelContentApplicant2UC: string;
  labelContentUnionType: string;
  labelContentUnionTypeUC: string;
  labelContentDivorceOrCivilPartnershipApplication: string;
  labelContentDivorceOrEndCivilPartnership: string;
  labelContentApplicantOrApplicant1: string;
  labelContentDivorceOrCivilPartnership: string;
  labelContentFinaliseDivorceOrEndCivilPartnership: string;
  labelContentMarriageOrCivilPartnership: string;
  labelContentMarriageOrCivilPartnershipUC: string;
  labelContentDivorceOrLegallyEnd: string;
  labelContentApplicantsOrApplicant1s: string;
  labelContentTheApplicantOrApplicant1: string;
  labelContentTheApplicantOrApplicant1UC: string;
  labelContentApplicantOrApplicant1UC: string;
  labelContentGotMarriedOrFormedCivilPartnership: string;
  labelContentRespondentsOrApplicant2s: string;
  labelContentDivorceOrEndingCivilPartnership: string;
  labelContentFinaliseDivorceOrLegallyEndYourCivilPartnership: string;
  labelContentApplicationType: ApplicationType;
  applicant1FirstName: string;
  applicant1MiddleName: string;
  applicant1LastName: string;
  applicant1ConfirmFullName: YesOrNo;
  applicant1Email: string;
  applicant1AgreedToReceiveEmails: YesOrNo;
  applicant1ConfirmReceipt: YesOrNo;
  applicant1LanguagePreferenceWelsh: YesOrNo;
  applicant1LastNameChangedWhenMarried: YesOrNo;
  applicant1LastNameChangedWhenMarriedMethod: ChangedNameHow[];
  applicant1LastNameChangedWhenMarriedOtherDetails: string;
  applicant1NameDifferentToMarriageCertificate: YesOrNo;
  applicant1NameDifferentToMarriageCertificateMethod: ChangedNameHow[];
  applicant1NameDifferentToMarriageCertificateOtherDetails: string;
  applicant1WhyNameDifferent: ChangedNameWhy[];
  applicant1WhyNameDifferentOtherDetails: string,
  applicant2WhyNameDifferent: ChangedNameWhy[];
  applicant2WhyNameDifferentOtherDetails: string,
  applicant1NameChangedHow: ChangedNameHow[];
  applicant1NameChangedHowOtherDetails: string;
  applicant1Address: AddressGlobalUK;
  applicant1AddressOverseas: YesOrNo;
  applicant1PhoneNumber: string;
  applicant1Gender: Gender;
  applicant1ContactDetailsType: ContactDetailsType;
  applicant1InRefuge: YesOrNo;
  applicant1SolicitorRepresented: YesOrNo;
  applicant1SolicitorName: string;
  applicant1SolicitorReference: string;
  applicant1SolicitorPhone: string;
  applicant1SolicitorEmail: string;
  applicant1SolicitorFirmName: string;
  applicant1SolicitorAddress: string;
  applicant1SolicitorAddressOverseas: YesOrNo;
  applicant1SolicitorAgreeToReceiveEmailsCheckbox: Prayer[];
  applicant1FinancialOrder: YesOrNo;
  applicant1UsedWelshTranslationOnSubmission: YesOrNo;
  applicant1FinancialOrdersFor: FinancialOrderFor[];
  applicant1LegalProceedings: YesOrNo;
  applicant1LegalProceedingsDetails: string;
  applicant1LegalProceedingsDetailsTranslated: string;
  applicant1LegalProceedingsDetailsTranslatedTo: TranslatedToLanguage;
  applicant1PcqId: string;
  applicant1ContinueApplication: YesOrNo;
  applicant1PrayerFinancialOrdersThemselves: FinancialOrdersThemselves[];
  applicant1PrayerFinancialOrdersChild: FinancialOrdersChild[];
  applicant1CoPronouncedCoverLetterRegenerated: YesOrNo;
  applicant1Offline: YesOrNo;
  applicant2FirstName: string;
  applicant2MiddleName: string;
  applicant2LastName: string;
  applicant2ConfirmFullName: YesOrNo;
  applicant2Email: string;
  applicant2AgreedToReceiveEmails: YesOrNo;
  applicant2ConfirmReceipt: YesOrNo;
  applicant2LanguagePreferenceWelsh: YesOrNo;
  applicant2LastNameChangedWhenMarried: YesOrNo;
  applicant2LastNameChangedWhenMarriedMethod: ChangedNameHow[];
  applicant2LastNameChangedWhenMarriedOtherDetails: string;
  applicant2NameDifferentToMarriageCertificate: YesOrNo;
  applicant2NameDifferentToMarriageCertificateMethod: ChangedNameHow[];
  applicant2NameDifferentToMarriageCertificateOtherDetails: string;
  applicant2NameChangedHow: ChangedNameHow[];
  applicant2NameChangedHowOtherDetails: string;
  applicant2Address: AddressGlobalUK;
  applicant2AddressOverseas: YesOrNo;
  applicant2PhoneNumber: string;
  applicant2Gender: Gender;
  applicant2ContactDetailsType: ContactDetailsType;
  applicant2InRefuge: YesOrNo;
  applicant2SolicitorRepresented: YesOrNo;
  applicant2SolicitorName: string;
  applicant2SolicitorReference: string;
  applicant2SolicitorPhone: string;
  applicant2SolicitorEmail: string;
  applicant2SolicitorFirmName: string;
  applicant2SolicitorAddress: string;
  applicant2SolicitorAddressOverseas: YesOrNo;
  applicant2SolicitorAgreeToReceiveEmailsCheckbox: Prayer[];
  applicant2FinancialOrder: YesOrNo;
  applicant2UsedWelshTranslationOnSubmission: YesOrNo;
  applicant2FinancialOrdersFor: FinancialOrderFor[];
  applicant2LegalProceedings: YesOrNo;
  applicant2LegalProceedingsDetails: string;
  applicant2LegalProceedingsDetailsTranslated: string;
  applicant2LegalProceedingsDetailsTranslatedTo: TranslatedToLanguage;
  applicant2LegalProceedingsConcluded: YesOrNo;
  applicant2UnableToUploadEvidence: YesOrNo;
  applicant2PrayerFinancialOrdersThemselves: FinancialOrdersThemselves[];
  applicant2PrayerFinancialOrdersChild: FinancialOrdersChild[];
  applicant2CoPronouncedCoverLetterRegenerated: YesOrNo;
  applicant2Offline: YesOrNo;
  applicant1ScreenHasMarriageBroken: YesOrNo;
  applicant2ScreenHasMarriageBroken: YesOrNo;
  screenHasMarriageCert: YesOrNo;
  marriageApplicant1Name: string;
  marriageApplicant2Name: string;
  marriageMarriedInUk: YesOrNo;
  marriageCertificateInEnglish: YesOrNo;
  marriageCertifiedTranslation: YesOrNo;
  marriageCountryOfMarriage: string;
  marriagePlaceOfMarriage: string;
  marriageDate: DateAsString;
  marriageFormationType: MarriageFormation;
  marriageCertifyMarriageCertificateIsCorrect: YesOrNo;
  marriageMarriageCertificateIsIncorrectDetails: string;
  marriageIssueApplicationWithoutMarriageCertificate: YesOrNo;
  jurisdictionApplicant1Residence: YesOrNo;
  jurisdictionApplicant2Residence: YesOrNo;
  jurisdictionApplicant1Domicile: YesOrNo;
  jurisdictionApplicant2Domicile: YesOrNo;
  jurisdictionApp1HabituallyResLastTwelveMonths: YesOrNo;
  jurisdictionApp1HabituallyResLastSixMonths: YesOrNo;
  jurisdictionResidualEligible: YesOrNo;
  jurisdictionBothLastHabituallyResident: YesOrNo;
  jurisdictionConnections: JurisdictionConnections[];
  applicant1HWFReferenceNumber: string;
  applicant1HWFNeedHelp: YesOrNo;
  applicant1HWFAppliedForFees: YesOrNo;
  applicant2HWFReferenceNumber: string;
  applicant2HWFNeedHelp: YesOrNo;
  applicant2HWFAppliedForFees: YesOrNo;
  applicant2FoHWFReferenceNumber: string;
  applicant2FoHWFNeedHelp: YesOrNo;
  applicant2FoHWFAppliedForFees: YesOrNo;
  divorceWho: WhoDivorcing;
  applicant1StatementOfTruth: YesOrNo;
  applicant2StatementOfTruth: YesOrNo;
  solSignStatementOfTruth: YesOrNo;
  applicant2SolSignStatementOfTruth: YesOrNo;
  solStatementOfReconciliationName: string;
  applicant2SolStatementOfReconciliationName: string;
  applicant2SolStatementOfReconciliationFirm: string;
  statementOfReconciliationComments: string;
  applicant2StatementOfReconciliationComments: string;
  applicant2FinalOrderFeeServiceRequestReference: string;
  applicant2AgreeToReceiveEmails: YesOrNo;
  applicant1KnowsApplicant2EmailAddress: YesOrNo;
  applicant1KnowsApplicant2Address: YesOrNo;
  app2ContactMethodIsDigital: YesOrNo;
  applicant1CannotUpload: YesOrNo;
  applicant1CannotUploadSupportingDocument: DocumentType[];
  applicant2CannotUpload: YesOrNo;
  applicant2CannotUploadSupportingDocument: DocumentType[];
  documentUploadComplete: YesOrNo;
  miniApplicationLink: Document;
  dateSubmitted: DateAsString;
  applicant2ConfirmApplicant1Information: YesOrNo;
  applicant2ExplainsApplicant1IncorrectInformation: string;
  issueDate: DateAsString;
  reissueDate: DateAsString;
  createdDate: DateAsString;
  newPaperCase: YesOrNo;
  switchedToSoleCo: YesOrNo;
  applicant2InviteEmailAddress: string;
  accessCode: string;
  accessCodeApplicant1: string;
  applicant2UserId: string;
  applicant1UserId: string;
  confirmReadPetition: YesOrNo;
  confirmDisputeApplication: YesOrNo;
  applicantNotifiedDisputeFormOverdue: YesOrNo;
  jurisdictionAgree: YesOrNo;
  intendToDelay: YesOrNo;
  dateAosSubmitted: DateAsString;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdictionTranslated: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdictionTranslatedTo: TranslatedToLanguage;
  inWhichCountryIsYourLifeMainlyBased: string;
  statementOfTruth: YesOrNo;
  howToRespondApplication: HowToRespondApplication;
  solicitorName: string;
  solicitorFirm: string;
  additionalComments: string;
  disputingFeeAccountNumber: string;
  disputingFeeAccountReferenceNumber: string;
  disputingFeeHelpWithFeesReferenceNumber: string;
  aosIsDrafted: YesOrNo;
  doesApplicant1WantToApplyForFinalOrder: YesOrNo;
  applicant1AppliedForFinalOrderFirst: YesOrNo;
  doesApplicant2WantToApplyForFinalOrder: YesOrNo;
  applicant2AppliedForFinalOrderFirst: YesOrNo;
  applicant2FinalOrderExplanation: string;
  dateFinalOrderEligibleToRespondent: DateAsString;
  isFinalOrderOverdue: YesOrNo;
  applicant1FinalOrderLateExplanation: string;
  applicant1FinalOrderLateExplanationTranslated: string;
  applicant1FinalOrderLateExplanationTranslatedTo: TranslatedToLanguage;
  applicant2FinalOrderLateExplanation: string;
  applicant2FinalOrderLateExplanationTranslated: string;
  applicant2FinalOrderLateExplanationTranslatedTo: TranslatedToLanguage;
  applicant1FinalOrderStatementOfTruth: YesOrNo;
  applicant2FinalOrderStatementOfTruth: YesOrNo;
  dateFinalOrderNoLongerEligible: DateAsString;
  finalOrderReminderSentApplicant1: YesOrNo;
  finalOrderFirstInTimeNotifiedOtherApplicantNotApplied: YesOrNo;
  finalOrderApplicant1NotifiedCanSwitchToSoleAfterIntention: YesOrNo;
  finalOrderApplicant2NotifiedCanSwitchToSoleAfterIntention: YesOrNo;
  finalOrderReminderSentApplicant2: YesOrNo;
  scannedD36Form: Document;
  dateD36FormScanned: DateAsString;
  d36ApplicationType: OfflineApplicationType;
  d36WhoApplying: OfflineWhoApplying;
  finalOrderSwitchedToSole: YesOrNo;
  applicant1CanIntendToSwitchToSoleFo: YesOrNo;
  applicant1IntendsToSwitchToSole: (YesOrNo | null)[];
  applicant2CanIntendToSwitchToSoleFo: YesOrNo;
  applicant2IntendsToSwitchToSole: (YesOrNo | null)[];
  doesApplicant1IntendToSwitchToSole: YesOrNo;
  dateApplicant1DeclaredIntentionToSwitchToSoleFo: DateAsString;
  doesApplicant2IntendToSwitchToSole: YesOrNo;
  dateApplicant2DeclaredIntentionToSwitchToSoleFo: DateAsString;
  applicant1GeneralAppServiceRequest: string;
  applicant2GeneralAppServiceRequest: string;
  isJudicialSeparation: YesOrNo;
  receivedServiceApplicationDate: DateAsString;
  receivedServiceAddedDate: DateAsString;
  serviceApplicationGranted: YesOrNo;
  refusalReason: ServiceApplicationRefusalReason;
  serviceApplicationRefusalReason: string;
  serviceApplicationDecisionDate: DateAsString;
  deemedServiceDate: DateAsString;
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDate: DateAsString;
  reasonFailureToServeByBailiff: string;
  divorceUnit: Court;
  dueDate: DateAsString;
  awaitingJsAnswerStartDate: DateAsString;
  note: string;
  dataVersion: number;
  exampleRetiredField: string;
  paperFormServiceOutsideUK: string;
  applicant1PrayerHasBeenGivenCheckbox: ThePrayer[];
  applicant2PrayerHasBeenGivenCheckbox: ThePrayer[];
  coRefusalRejectionReason: RejectionReason[];
  hyphenatedCaseRef: string;
  nocAreTheyRepresented: YesOrNo;
  nocAreTheyDigital: YesOrNo;
  paperFormServeOutOfUK: YesOrNo;
  paperFormRespondentServePostOnly: YesOrNo;
  paperFormApplicantWillServeApplication: YesOrNo;
  paperFormRespondentDifferentServiceAddress: YesOrNo;
  paperFormSummaryApplicant1FinancialOrdersFor: FinancialOrderFor[];
  paperFormSummaryApplicant2FinancialOrdersFor: FinancialOrderFor[];
  paperFormApplicant1SigningSOT: YesOrNo;
  paperFormApplicant1LegalRepSigningSOT: YesOrNo;
  paperFormApplicant2SigningSOT: YesOrNo;
  paperFormApplicant2LegalRepSigningSOT: YesOrNo;
  paperFormApplicant1LegalRepPosition: string;
  paperFormApplicant2LegalRepPosition: string;
  paperFormApplicant1SOTSignedOn: string;
  paperFormApplicant2SOTSignedOn: string;
  paperFormFeeInPounds: string;
  paperFormApplicant1NoPaymentIncluded: YesOrNo;
  paperFormApplicant2NoPaymentIncluded: YesOrNo;
  paperFormSoleOrApplicant1PaymentOther: YesOrNo;
  paperFormApplicant2PaymentOther: YesOrNo;
  paperFormSoleOrApplicant1PaymentOtherDetail: string;
  paperFormApplicant2PaymentOtherDetail: string;
  paperFormDebitCreditCardPayment: YesOrNo;
  paperFormDebitCreditCardPaymentPhone: YesOrNo;
  paperFormHowToPayEmail: YesOrNo;
  paperFormPaymentDetailEmail: string;
  paperFormChequeOrPostalOrderPayment: YesOrNo;
}

export type DateAsString = string;

export const enum YesOrNo {
  YES = 'Yes',
  NO = 'No',
}

export const enum ApplicationType {
  SOLE_APPLICATION = 'soleApplication',
  JOINT_APPLICATION = 'jointApplication',
}

export const enum ChangedNameWhy {
  DEED_POLL = 'deedPoll',
  CHANGED_PARTS_OF_NAME = 'changedPartsOfName',
  PART_OF_NAME_NOT_INCLUDED = 'partOfNameNotIncluded',
  PART_OF_NAME_ABBREVIATED = 'partOfNameAbbreviated',
  LEGAL_NAME_SPELLED_DIFFERENTLY = 'legalNameSpelledDifferently',
  OTHER = 'other',
}

export const enum ChangedNameHow {
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  DEED_POLL = 'deedPoll',
  OTHER = 'other',
}

export const enum ContactDetailsType {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export const enum Court {
  SERVICE_CENTRE = 'serviceCentre',
  EAST_MIDLANDS = 'eastMidlands',
  WEST_MIDLANDS = 'westMidlands',
  SOUTH_WEST = 'southWest',
  NORTH_WEST = 'northWest',
  BURY_ST_EDMUNDS = 'buryStEdmunds',
}

export const enum DivorceOrDissolution {
  DIVORCE = 'divorce',
  DISSOLUTION = 'dissolution',
}

export const enum FinancialOrderFor {
  APPLICANT = 'applicant',
  CHILDREN = 'children',
}

export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export const enum HowToRespondApplication {
  WITHOUT_DISPUTE_DIVORCE = 'withoutDisputeDivorce',
  DISPUTE_DIVORCE = 'disputeDivorce',
}

export const enum JurisdictionConnections {
  /**
   * APP_1_APP_2_RESIDENT
   */
  APP_1_APP_2_RESIDENT = 'A',
  /**
   * APP_1_APP_2_LAST_RESIDENT
   */
  APP_1_APP_2_LAST_RESIDENT = 'B',
  /**
   * APP_2_RESIDENT_SOLE
   */
  APP_2_RESIDENT_SOLE = 'C',
  /**
   * APP_2_RESIDENT_JOINT
   */
  APP_2_RESIDENT_JOINT = 'C2',
  /**
   * APP_1_RESIDENT_TWELVE_MONTHS
   */
  APP_1_RESIDENT_TWELVE_MONTHS = 'D',
  /**
   * APP_1_RESIDENT_SIX_MONTHS
   */
  APP_1_RESIDENT_SIX_MONTHS = 'E',
  /**
   * APP_1_APP_2_DOMICILED
   */
  APP_1_APP_2_DOMICILED = 'F',
  /**
   * APP_1_DOMICILED
   */
  APP_1_DOMICILED = 'G',
  /**
   * APP_2_DOMICILED
   */
  APP_2_DOMICILED = 'H',
  /**
   * RESIDUAL_JURISDICTION_CP
   */
  RESIDUAL_JURISDICTION_CP = 'I',
  /**
   * RESIDUAL_JURISDICTION_D
   */
  RESIDUAL_JURISDICTION_D = 'I2',
  /**
   * APP_1_RESIDENT_JOINT
   */
  APP_1_RESIDENT_JOINT = 'J',
}

export const enum LanguagePreference {
  ENGLISH = 'ENGLISH',
  WELSH = 'WELSH',
}

export const enum MarriageFormation {
  SAME_SEX_COUPLE = 'sameSexCouple',
  OPPOSITE_SEX_COUPLE = 'oppositeSexCouple',
}

export const enum OfflineApplicationType {
  SOLE = 'sole',
  JOINT = 'joint',
  SWITCH_TO_SOLE = 'switchToSole',
}

export const enum OfflineWhoApplying {
  APPLICANT_1 = 'applicant1',
  APPLICANT_2 = 'applicant2',
}

export const enum RejectionReason {
  OTHER = 'other',
  NO_JURISDICTION = 'noJurisdiction',
}

export const enum ServiceApplicationRefusalReason {
  ADMIN_REFUSAL = 'adminRefusal',
  REFUSAL_ORDER_TO_APPLICANT = 'refusalOrderToApplicant',
}

export const enum State {
  Holding = 'Holding',
  AwaitingAos = 'AwaitingAos',
  AosDrafted = 'AosDrafted',
  AosOverdue = 'AosOverdue',
  Applicant2Approved = 'Applicant2Approved',
  AwaitingPayment = 'AwaitingPayment',
  AwaitingResponseToHWFDecision = 'AwaitingResponseToHWFDecision',
  AwaitingFinalOrderPayment = 'AwaitingFinalOrderPayment',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
  Archived = 'Archived',
  AwaitingAdminClarification = 'AwaitingAdminClarification',
  AwaitingAlternativeService = 'AwaitingAlternativeService',
  AwaitingAmendedApplication = 'AwaitingAmendedApplication',
  AwaitingDocuments = 'AwaitingDocuments',
  AwaitingApplicant1Response = 'AwaitingApplicant1Response',
  AwaitingApplicant2Response = 'AwaitingApplicant2Response',
  AwaitingBailiffReferral = 'AwaitingBailiffReferral',
  AwaitingBailiffService = 'AwaitingBailiffService',
  AwaitingClarification = 'AwaitingClarification',
  AwaitingConditionalOrder = 'AwaitingConditionalOrder',
  AwaitingDwpResponse = 'AwaitingDwpResponse',
  AwaitingFinalOrder = 'AwaitingFinalOrder',
  AwaitingGeneralConsideration = 'AwaitingGeneralConsideration',
  AwaitingGeneralReferralPayment = 'AwaitingGeneralReferralPayment',
  AwaitingGenAppHWFEvidence = 'AwaitingGenAppHWFEvidence',
  AwaitingGenAppHWFPartPayment = 'AwaitingGenAppHWFPartPayment',
  AwaitingHWFDecision = 'AwaitingHWFDecision',
  AwaitingHWFEvidence = 'AwaitingHWFEvidence',
  AwaitingHWFPartPayment = 'AwaitingHWFPartPayment',
  AwaitingRequestedInformation = 'AwaitingRequestedInformation',
  ConditionalOrderPending = 'ConditionalOrderPending',
  AwaitingJointFinalOrder = 'AwaitingJointFinalOrder',
  AwaitingJudgeClarification = 'AwaitingJudgeClarification',
  PendingServiceAppResponse = 'PendingServiceAppResponse',
  AwaitingLegalAdvisorReferral = 'AwaitingLegalAdvisorReferral',
  AwaitingService = 'AwaitingService',
  AwaitingServiceConsideration = 'AwaitingServiceConsideration',
  AwaitingServicePayment = 'AwaitingServicePayment',
  AwaitingAnswer = 'AwaitingAnswer',
  AwaitingJsNullity = 'AwaitingJsNullity',
  BailiffRefused = 'BailiffRefused',
  ClarificationSubmitted = 'ClarificationSubmitted',
  ConditionalOrderDrafted = 'ConditionalOrderDrafted',
  ConditionalOrderPronounced = 'ConditionalOrderPronounced',
  ConditionalOrderRefused = 'ConditionalOrderRefused',
  ConditionalOrderReview = 'ConditionalOrderReview',
  Draft = 'Draft',
  FinalOrderComplete = 'FinalOrderComplete',
  FinalOrderPending = 'FinalOrderPending',
  FinalOrderRequested = 'FinalOrderRequested',
  AwaitingGeneralApplicationPayment = 'AwaitingGeneralApplicationPayment',
  GeneralApplicationReceived = 'GeneralApplicationReceived',
  GeneralConsiderationComplete = 'GeneralConsiderationComplete',
  InformationRequested = 'InformationRequested',
  IssuedToBailiff = 'IssuedToBailiff',
  JSAwaitingLA = 'JSAwaitingLA',
  LAReview = 'LAReview',
  LAServiceReview = 'LAServiceReview',
  AwaitingPronouncement = 'AwaitingPronouncement',
  NewPaperCase = 'NewPaperCase',
  OfflineDocumentReceived = 'OfflineDocumentReceived',
  PendingHearingOutcome = 'PendingHearingOutcome',
  PendingHearingDate = 'PendingHearingDate',
  BulkCaseReject = 'BulkCaseReject',
  RequestedInformationSubmitted = 'RequestedInformationSubmitted',
  RespondentFinalOrderRequested = 'RespondentFinalOrderRequested',
  SeparationOrderGranted = 'SeparationOrderGranted',
  ServiceAdminRefusal = 'ServiceAdminRefusal',
  Submitted = 'Submitted',
  WelshTranslationRequested = 'WelshTranslationRequested',
  WelshTranslationReview = 'WelshTranslationReview',
  PendingRefund = 'PendingRefund',
}

export const enum SupplementaryCaseType {
  NA = 'notApplicable',
  JUDICIAL_SEPARATION = 'judicialSeparation',
  SEPARATION = 'separation',
}

export const enum TranslatedToLanguage {
  WELSH = 'translatedToWelsh',
  ENGLISH = 'translatedToEnglish',
}

export const enum WhoDivorcing {
  HUSBAND = 'husband',
  WIFE = 'wife',
}

export const enum FinancialOrdersThemselves {
  FINANCIAL_ORDERS_THEMSELVES = 'financialOrdersThemselves',
}

export const enum FinancialOrdersChild {
  FINANCIAL_ORDERS_CHILD = 'financialOrdersChild',
}

export const enum ThePrayer {
  I_CONFIRM = 'Yes',
}

export const enum Prayer {
  CONFIRM = 'Yes',
}

export const CITIZEN_UPDATE_CASE_STATE_AAT = 'citizen-update-case-state-aat';
