import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';
import { authenticator } from 'otplib';
import dotenv from "dotenv";

dotenv.config();

const logger = Logger.getLogger('service-auth-token');
let token;

export const getTokenFromApi = async (): Promise<void> => {
  logger.info('Refreshing service auth token');

  const url: string = process.env.AUTH_PROVIDER_URL + '/lease';
  const microservice: string | undefined = process.env.AUTH_PROVIDER_SERVICE;
  const secret: string | undefined = process.env.SERVICE_AUTH_SECRET;
  const oneTimePassword = authenticator.generate(secret as string);
  const body = { microservice, oneTimePassword };

  try {
    const response = await axios.post(url, body);
    token = response.data;
  } catch (err: any) {
    logger.error(err.response?.status, err.response?.data);
    throw err;
  }
};

export const initAuthToken = async (): Promise<void> => {
  await getTokenFromApi();
  
  setInterval(getTokenFromApi, 1000 * 60 * 60);
};

export const getServiceAuthToken = async (): Promise<string> => {
  if (!token) {
    await initAuthToken();
  }

  return token;
};
