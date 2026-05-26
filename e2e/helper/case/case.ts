import {
  AddressGlobalUK,
  ApplicationType,
  ChangedNameHow, ContactDetailsType, DateAsString,
  DivorceOrDissolution,
  FinancialOrderFor,
  Gender,

  JurisdictionConnections, LanguagePreference,
  State,
  YesOrNo,
} from './definition';

export interface Case {
  applicationType?: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  issueDate?: DateAsString;
  gender?: Gender;
  sameSex?: YesOrNo;
  applicant1ScreenHasUnionBroken?: YesOrNo;
  relationshipDate?: CaseDate;
  hasCertificate?: YesOrNo;
  applicant1HWFNeedHelp?: YesOrNo;
  inTheUk?: YesOrNo;
  jurisdictionApplicant1Residence?: YesOrNo;
  jurisdictionApplicant2Residence?: YesOrNo;
  applicant1EnglishOrWelsh?: LanguagePreference;
  applicant2EnglishOrWelsh?: LanguagePreference;
  applicant1FirstName?: string;
  applicant1MiddleName?: string;
  applicant1LastName?: string;
  applicant1ConfirmFullName?: YesOrNo | null;
  applicant1Address?: AddressGlobalUK;
  applicant2Address?: AddressGlobalUK;
  applicant1PhoneNumber?: string;
  applicant1AgreedToReceiveEmails?: YesOrNo;
  connections: JurisdictionConnections[];
  marriageApplicant1Name?: string;
  marriageApplicant2Name?: string;
  applicant1ContactDetailsType: ContactDetailsType;
  applicant2FirstName?: string;
  applicant2MiddleName?: string;
  applicant2LastName?: string;
  applicant2ConfirmFullName?: YesOrNo | null;
  applicant2Address1?: string;
  applicant2Address2?: string;
  applicant2Address3?: string;
  applicant2AddressTown?: string;
  applicant2AddressCounty?: string;
  applicant2AddressPostcode?: string;
  applicant2AddressCountry?: string;
  applicant2AddressOverseas?: YesOrNo;
  applicant1LastNameChangedWhenMarried?: YesOrNo;
  applicant1LastNameChangedWhenMarriedMethod?: ChangedNameHow[];
  applicant1NameDifferentToMarriageCertificate?: YesOrNo | null;
  applicant2NameDifferentToMarriageCertificate?: YesOrNo | null;
  applicant1NameDifferentToMarriageCertificateMethod?: ChangedNameHow[];
  applicant2NameDifferentToMarriageCertificateMethod?: ChangedNameHow[];
  applicant2InviteEmailAddress?: string;
  applicant1DoesNotKnowApplicant2EmailAddress?: YesOrNo;
  applicant1KnowsApplicant2Address?: YesOrNo;
  applicant1LegalProceedings?: YesOrNo;
  applicant1FinancialOrder?: YesOrNo;
  applicant1FinancialOrdersFor?: FinancialOrderFor[];
  applicant1CannotUpload?: YesOrNo;
  applicant1CannotUploadDocuments?: DocumentType | DocumentType[];
  accessCode?: string;
}

export interface CaseWithId extends Case {
  id: string;
  state: State;
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

