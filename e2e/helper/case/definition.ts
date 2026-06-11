import {CaseData} from "./caseData.ts";

export const enum State {
  Holding = 'Holding',
  Draft = 'Draft',
  Submitted = 'Submitted',
}


export interface CaseWithId extends CaseData {
  id: string;
  state: State;
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export type DateAsString = string;

export const enum YesOrNo {
  YES = 'Yes',
  NO = 'No',
}

export const enum ChangedNameHow {
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  DEED_POLL = 'deedPoll',
  OTHER = 'other',
}


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


/* Valid combinations of FeeType, FeeEventType and FeeServiceType

  { FeeType: DivorceCivPart, service: 'divorce', event: 'issue' },
  { FeeType: DivorceAmendPetition, service: 'other', event: 'issue' },
  { FeeType: AppnPrivateOther, service: 'other', event: 'issue' },
  { FeeType: GAContestedOrder, service: 'other', event: 'general application' },
  { FeeType: BailiffServeDoc, service: 'other', event: 'enforcement' },
  { FeeType: FinancialOrderOnNotice, service: 'other', event: 'miscellaneous' },
  { FeeType: GeneralAppWithoutNotice:, service: 'other', event: 'general application' },
  { FeeType: GAOnNotice, service: 'other', event: 'general application' },
  { FeeType: DivAnswerReceived, service: 'other', event: 'issue' },
  { FeeType: SearchIndexDivCentral, service: 'other', event: 'search' },

 */
export const enum FeeTypes {
  DivorceCivPart = 'DivorceCivPart',
}

export const enum FeeEventTypes {
  ISSUE = 'issue' ,
}

export const enum FeeServiceTypes {
  DIVORCE = 'divorce',
}

export const CITIZEN_UPDATE_CASE_STATE_AAT = 'citizen-update-case-state-aat';
export const CITIZEN_CREATE_CASE = 'citizen-create-application';
export const SOLICITOR_CREATE_CASE = 'solicitor-create-application';
