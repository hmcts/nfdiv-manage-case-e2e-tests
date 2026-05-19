import {
  Applicant2Represented,
  ApplicationType,
  CaseData, ChangedNameHow, DateAsString,
  DivorceOrDissolution,
  DocumentType, FinancialOrderFor,
  Gender,

  JurisdictionConnections,
  State,
  YesOrNo,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  accessCode: 'accessCode',
  applicationType: 'applicationType',
  divorceOrDissolution: 'divorceOrDissolution',
  gender: 'applicant2Gender',
  applicant1ScreenHasUnionBroken: 'applicant1ScreenHasMarriageBroken',
  hasCertificate: 'screenHasMarriageCert',
  applicant1HelpPayingNeeded: 'applicant1HWFNeedHelp',
  inTheUk: 'marriageMarriedInUk',
  applicant1LifeBasedInEnglandAndWales: 'jurisdictionApplicant1Residence',
  applicant2LifeBasedInEnglandAndWales: 'jurisdictionApplicant2Residence',
  connections: 'jurisdictionConnections',
  applicant1PhoneNumber: 'applicant1PhoneNumber',
  applicant1FirstNames: 'applicant1FirstName',
  applicant1MiddleNames: 'applicant1MiddleName',
  applicant1LastNames: 'applicant1LastName',
  applicant1ConfirmFullName: 'applicant1ConfirmFullName',
  applicant2FirstNames: 'applicant2FirstName',
  applicant2MiddleNames: 'applicant2MiddleName',
  applicant2LastNames: 'applicant2LastName',
  applicant2ConfirmFullName: 'applicant2ConfirmFullName',
  applicant1FullNameOnCertificate: 'marriageApplicant1Name',
  applicant2FullNameOnCertificate: 'marriageApplicant2Name',
  applicant1LastNameChangedWhenMarried: 'applicant1LastNameChangedWhenMarried',
  applicant1NameDifferentToMarriageCertificate: 'applicant1NameDifferentToMarriageCertificate',
  applicant1LastNameChangedWhenMarriedMethod: 'applicant1LastNameChangedWhenMarriedMethod',
  applicant1NameDifferentToMarriageCertificateMethod: 'applicant1NameDifferentToMarriageCertificateMethod',
  applicant2NameDifferentToMarriageCertificate: 'applicant2NameDifferentToMarriageCertificate',
  applicant2NameDifferentToMarriageCertificateMethod: 'applicant2NameDifferentToMarriageCertificateMethod',
  applicant2EmailAddress: 'applicant2InviteEmailAddress',
  applicant1KnowsApplicant2Address: 'applicant1KnowsApplicant2Address',
  applicant1LegalProceedings: 'applicant1LegalProceedings',
  applicant1ApplyForFinancialOrder: 'applicant1FinancialOrder',
  applicant1WhoIsFinancialOrderFor: 'applicant1FinancialOrdersFor',
  applicant1IsApplicant2Represented: 'applicant1IsApplicant2Represented',
  applicant1CannotUpload: 'applicant1CannotUpload',
};

export function formatCase<OutputFormat>(fields: FieldFormats, data: Partial<Case> | CaseData): OutputFormat {
  const result = {};

  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      result[value] = data[field];
    }
  }

  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

export interface Case {
  applicationType?: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  issueDate?: DateAsString;
  gender?: Gender;
  sameSex?: Checkbox;
  applicant1ScreenHasUnionBroken?: YesOrNo;
  relationshipDate?: CaseDate;
  hasCertificate?: YesOrNo;
  applicant1HelpPayingNeeded?: YesOrNo;
  inTheUk?: YesOrNo;
  applicant1LifeBasedInEnglandAndWales?: YesOrNo;
  applicant2LifeBasedInEnglandAndWales?: YesOrNo;
  applicant1EnglishOrWelsh?: LanguagePreference;
  applicant2EnglishOrWelsh?: LanguagePreference;
  applicant1FirstNames?: string;
  applicant1MiddleNames?: string;
  applicant1LastNames?: string;
  applicant1ConfirmFullName?: YesOrNo | null;
  applicant1Address1?: string;
  applicant1Address2?: string;
  applicant1Address3?: string;
  applicant1AddressTown?: string;
  applicant1AddressCounty?: string;
  applicant1AddressPostcode?: string;
  applicant1AddressCountry?: string;
  applicant1AddressOverseas?: YesOrNo;
  applicant1PhoneNumber?: string;
  applicant1AgreeToReceiveEmails?: Checkbox;
  connections: JurisdictionConnections[];
  applicant1FullNameOnCertificate?: string;
  applicant2FullNameOnCertificate?: string;
  applicant1AddressPrivate: YesOrNo;
  applicant2FirstNames?: string;
  applicant2MiddleNames?: string;
  applicant2LastNames?: string;
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
  applicant2EmailAddress?: string;
  applicant1DoesNotKnowApplicant2EmailAddress?: Checkbox;
  applicant1KnowsApplicant2Address?: YesOrNo;
  applicant1LegalProceedings?: YesOrNo;
  applicant1ApplyForFinancialOrder?: YesOrNo;
  applicant1WhoIsFinancialOrderFor?: FinancialOrderFor[];
  applicant1CannotUpload?: Checkbox;
  applicant1CannotUploadDocuments?: DocumentType | DocumentType[];
  accessCode?: string;
  applicant1IsApplicant2Represented: Applicant2Represented;
}

export interface CaseWithId extends Case {
  id: string;
  state: State;
}

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export enum LanguagePreference {
  English = 'english',
  Welsh = 'welsh',
}

export interface UploadedFile {
  id: string;
  name: string;
}

export type AnyObject = Record<string, unknown>;

