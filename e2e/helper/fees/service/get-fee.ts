import {Logger} from '@hmcts/nodejs-logging';
import axios from 'axios';
import dotenv from "dotenv";
import {FeeEventTypes, FeeServiceTypes, FeeTypes} from "../../case/definition.ts";

dotenv.config();

const logger = Logger.getLogger('get-fees');

export const getFee = async (feeType: FeeTypes = FeeTypes.DivorceCivPart,
  service: FeeServiceTypes = FeeServiceTypes.DIVORCE,
  event: FeeEventTypes = FeeEventTypes.ISSUE): Promise<string> => {

  const url =
    process.env.SERVICE_FEES_URL +
    '/fees-register/fees/lookup' +
    `?channel=default` +
    `&jurisdiction1=family` +
    `&jurisdiction2=family court` +
    `&service=${service}` +
    `&keyword=${feeType}` +
    `&event=${event}`;

  try {
    const response = await axios.get(url);
    return '£' +  response.data.fee_amount;
  } catch (err) {
    logger.error('Failed to get fee: ', err.response?.status, err.response?.data);
    process.exit(1);
  }
};
