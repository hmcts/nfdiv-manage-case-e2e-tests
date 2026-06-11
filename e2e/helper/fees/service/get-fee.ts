import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

const logger = Logger.getLogger('get-fees');
const fees = {
  DivorceCivPart: { amount: 0, service: 'divorce', event: 'issue' },
  DivorceAmendPetition: { amount: 0, service: 'other', event: 'issue' },
  AppnPrivateOther: { amount: 0, service: 'other', event: 'issue' },
  GAContestedOrder: { amount: 0, service: 'other', event: 'general application' },
  BailiffServeDoc: { amount: 0, service: 'other', event: 'enforcement' },
  FinancialOrderOnNotice: { amount: 0, service: 'other', event: 'miscellaneous' },
  GeneralAppWithoutNotice: { amount: 0, service: 'other', event: 'general application' },
  GAOnNotice: { amount: 0, service: 'other', event: 'general application' },
  DivAnswerReceived: { amount: 0, service: 'other', event: 'issue' },
  SearchIndexDivCentral: { amount: 0, service: 'other', event: 'search' },
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

const updateFees = async (): Promise<void> => {
  logger.info('Refreshing fees');
  await Promise.all(Object.keys(fees).map(k => updateFee(k as FeeKeyword)));
};

export const initFees = async (): Promise<void> => {
  await updateFees();
  setInterval(updateFees, 1000 * 60 * 60);
};

export const getFee = async (keyword: FeeKeyword): Promise<string> => {
  return '£' + fees[keyword].amount;
};

await initFees();
