import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

const logger = Logger.getLogger('get-fees');
const fees = {
  DivorceCivPart: { amount: null, service: 'divorce', event: 'issue' },
  DivorceAmendPetition: { amount: null, service: 'other', event: 'issue' },
  AppnPrivateOther: { amount: null, service: 'other', event: 'issue' },
  GAContestedOrder: { amount: null, service: 'other', event: 'general application' },
  BailiffServeDoc: { amount: null, service: 'other', event: 'enforcement' },
  FinancialOrderOnNotice: { amount: null, service: 'other', event: 'miscellaneous' },
  GeneralAppWithoutNotice: { amount: null, service: 'other', event: 'general application' },
  GAOnNotice: { amount: null, service: 'other', event: 'general application' },
  DivAnswerReceived: { amount: null, service: 'other', event: 'issue' },
  SearchIndexDivCentral: { amount: null, service: 'other', event: 'search' },
};

type FeeKeyword = keyof typeof fees;

export const updateFee = async (keyword: FeeKeyword): Promise<void> => {
  const url =
    process.env.SERVICE_FEES_URL +
    '/fees-register/fees/lookup' +
    `?channel=default` +
    `&jurisdiction1=family` +
    `&jurisdiction2=family%20court` +
    `&service=${fees[keyword].service}` +
    `&keyword=${keyword}` +
    `&event=${fees[keyword].event}`;

  try {
    const response = await axios.get(url);
    fees[keyword].amount = response.data.fee_amount;
  } catch (err) {
    logger.error(err.response?.status, err.response?.data);
  }
};

export const getFee = async (keyword: FeeKeyword): Promise<string> => {
  if (!fees[keyword].amount) {
    updateFee(keyword);
  }
  
  return '£' + fees[keyword].amount;
};
