import pkg from 'lodash';
const { invert } = pkg;

import { Case, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from '../case';
import { CaseData, HowToRespondApplication, YesOrNo } from '../definition';
import { fromApi as formatAddress } from './address';

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

export const checkboxConverter = (value: string | undefined): Checkbox | undefined => {
  if (!value) {
    return undefined;
  }

  return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};

const prayerConverter = (applicant: 'applicant1' | 'applicant2') => {
  return data => ({
    [`${applicant}IConfirmPrayer`]:
      data[`${applicant}PrayerDissolveDivorce`]?.length > 0 ||
      data[`${applicant}PrayerEndCivilPartnership`]?.length > 0 ||
      data[`${applicant}PrayerFinancialOrdersThemselves`]?.length > 0 ||
      data[`${applicant}PrayerFinancialOrdersChild`]?.length > 0
        ? Checkbox.Checked
        : Checkbox.Unchecked,
  });
};

const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  applicant2LanguagePreferenceWelsh: data => ({
    applicant2EnglishOrWelsh:
      data.applicant2LanguagePreferenceWelsh === YesOrNo.YES
        ? LanguagePreference.Welsh
        : data.applicant2LanguagePreferenceWelsh === null
          ? data.applicant2LanguagePreferenceWelsh
          : LanguagePreference.English,
  }),
  applicant1Address: data => formatAddress(data, 'applicant1'),

  applicant1PrayerDissolveDivorce: prayerConverter('applicant1'),
  applicant1PrayerEndCivilPartnership: prayerConverter('applicant1'),
  applicant1PrayerFinancialOrdersThemselves: prayerConverter('applicant1'),
  applicant1PrayerFinancialOrdersChild: prayerConverter('applicant1'),
  applicant2PrayerDissolveDivorce: prayerConverter('applicant2'),
  applicant2PrayerEndCivilPartnership: prayerConverter('applicant2'),
  applicant2PrayerFinancialOrdersThemselves: prayerConverter('applicant2'),
  applicant2PrayerFinancialOrdersChild: prayerConverter('applicant2'),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  howToRespondApplication: ({ howToRespondApplication }) => ({
    disputeApplication:
      howToRespondApplication === HowToRespondApplication.DISPUTE_DIVORCE
        ? YesOrNo.YES
        : howToRespondApplication === null
          ? howToRespondApplication
          : YesOrNo.NO,
  }),
  previousState: 'previousState',
  applicant1SolicitorRepresented: 'applicant1SolicitorRepresented',
  switchedToSoleCo: 'switchedToSoleCo',
  applicant1AppliedForFinalOrderFirst: 'applicant1AppliedForFinalOrderFirst',
  applicant2AppliedForFinalOrderFirst: 'applicant2AppliedForFinalOrderFirst',
  coIsAdminClarificationSubmitted: 'coIsAdminClarificationSubmitted',
  doesApplicant1IntendToSwitchToSole: 'doesApplicant1IntendToSwitchToSole',
  dateApplicant1DeclaredIntentionToSwitchToSoleFo: 'dateApplicant1DeclaredIntentionToSwitchToSoleFo',
  doesApplicant2IntendToSwitchToSole: 'doesApplicant2IntendToSwitchToSole',
  dateApplicant2DeclaredIntentionToSwitchToSoleFo: 'dateApplicant2DeclaredIntentionToSwitchToSoleFo',
  app1RfiDraftResponseDetails: 'app1RfiDraftResponseDetails',
  applicant1NoResponsePartnerAddress: data => formatAddress(data, 'applicant1NoResponsePartner'),
  applicant1DispenseLivedTogetherAddress: data => formatAddress(data, 'applicant1DispenseLivedTogether'),
  applicant1SearchGovRecordsPartnerLastKnownAddress: data =>
    formatAddress(data, 'applicant1SearchGovRecordsPartnerLastKnown'),
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
