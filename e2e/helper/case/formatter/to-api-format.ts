import {
  Case,
  Checkbox,
  LanguagePreference,
  formFieldsToCaseMapping,
  CaseWithId,
  formatCase
} from '../case';
import {
  CaseData,
  YesOrNo,
} from '../definition';
import {
  applicant1AddressToApi,
  applicant2AddressToApi,
} from './address';

export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (value === null) {
    return null;
  }

  return value === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
};

const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,

  applicant1EnglishOrWelsh: data => ({
    applicant1LanguagePreferenceWelsh: languagePreferenceYesNoOrNull(data.applicant1EnglishOrWelsh),
  }),
  applicant2EnglishOrWelsh: data => ({
    applicant2LanguagePreferenceWelsh: languagePreferenceYesNoOrNull(data.applicant2EnglishOrWelsh),
  }),
  applicant1AddressPostcode: applicant1AddressToApi,
  applicant1AgreeToReceiveEmails: data => ({
    applicant1AgreedToReceiveEmails: checkboxConverter(data.applicant1AgreeToReceiveEmails),
  }),
  applicant1AddressOverseas: ({ applicant1AddressOverseas }) => ({
    applicant1AddressOverseas: applicant1AddressOverseas ?? YesOrNo.NO,
  }),
  applicant2AddressPostcode: applicant2AddressToApi,

  applicant1CannotUploadDocuments: data => ({
    applicant1CannotUploadSupportingDocument: data.applicant1CannotUploadDocuments
      ? !Array.isArray(data.applicant1CannotUploadDocuments)
        ? [data.applicant1CannotUploadDocuments]
        : data.applicant1CannotUploadDocuments
      : [],
    applicant1CannotUpload: data.applicant1CannotUploadDocuments?.length ? YesOrNo.YES : YesOrNo.NO,
  }),
  applicant1NameDifferentToMarriageCertificate: data => ({
    applicant1NameDifferentToMarriageCertificate: data.applicant1NameDifferentToMarriageCertificate,
    ...(data.applicant1NameDifferentToMarriageCertificate === YesOrNo.NO
      ? setUnreachableAnswersToNull([
        'applicant1WhyNameDifferent',
        'applicant1WhyNameDifferentOtherDetails',
        'applicant1NameDifferentToMarriageCertificateMethod',
        'applicant1NameDifferentToMarriageCertificateOtherDetails',
      ])
      : {}),
  }),
  applicant2NameDifferentToMarriageCertificate: data => ({
    applicant2NameDifferentToMarriageCertificate: data.applicant2NameDifferentToMarriageCertificate,
    ...(data.applicant2NameDifferentToMarriageCertificate === YesOrNo.NO
      ? setUnreachableAnswersToNull([
        'applicant2WhyNameDifferent',
        'applicant2WhyNameDifferentOtherDetails',
        'applicant2NameDifferentToMarriageCertificateMethod',
        'applicant2NameDifferentToMarriageCertificateOtherDetails',
      ])
      : {}),
  }),
  applicant1HelpPayingNeeded: data => ({
    applicant1HWFNeedHelp: data.applicant1HelpPayingNeeded,
    ...(data.applicant1HelpPayingNeeded === YesOrNo.NO
      ? setUnreachableAnswersToNull(['applicant1HWFAppliedForFees', 'applicant1HWFReferenceNumber'])
      : {}),
  }),
  applicant2AddressOverseas: ({ applicant2AddressOverseas }) => ({
    applicant2AddressOverseas: applicant2AddressOverseas ?? YesOrNo.NO,
  }),
  inTheUk: data => ({
    marriageMarriedInUk: data.inTheUk,
    ...(data.inTheUk === YesOrNo.YES
      ? setUnreachableAnswersToNull([
        'marriageCertificateInEnglish',
        'marriageCertifiedTranslation',
        'marriageCountryOfMarriage',
        'marriagePlaceOfMarriage',
      ])
      : {}),
  }),
  applicant1ApplyForFinancialOrder: data => ({
    applicant1FinancialOrder: data.applicant1ApplyForFinancialOrder,
    ...(data.applicant1ApplyForFinancialOrder === YesOrNo.NO && { applicant1FinancialOrdersFor: [] }),
  }),
};

const languagePreferenceYesNoOrNull = (value: LanguagePreference | undefined) => {
  if (!value) {
    return null;
  }
  return value === LanguagePreference.Welsh ? YesOrNo.YES : YesOrNo.NO;
};

const setUnreachableAnswersToNull = (
  properties: (keyof Partial<Case> | keyof Partial<CaseData>)[]
): Record<string, null> =>
  properties.reduce((arr: Record<string, null>, property: string) => ({ ...arr, [property]: null }), {});

export const toApiFormat = (data: Partial<Case>): CaseWithId => formatCase(fields, data);
