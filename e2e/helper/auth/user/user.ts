import { Logger } from '@hmcts/nodejs-logging';
import axios, { AxiosResponse } from 'axios';
import NodeCache from 'node-cache';
import {Case} from "../../case/case";
import {State} from "../../case/definition";

const logger = Logger.getLogger('oidc');

export const idamTokenCache = new NodeCache({ stdTTL: 3600, checkperiod: 1800 });
export interface OidcResponse {
  id_token: string;
  access_token: string;
}

const createIdamToken = (params: Record<string, string>): Promise<AxiosResponse<OidcResponse>> => {
  const id: string = process.env.IDAM_CLIENT_ID as string;
  const secret: string = process.env.IDAM_SECRET as string;
  const tokenUrl: string = process.env.IDAM_TOKEN_URL as string;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };

  let data = '';
  if (params.username && params.password) {
    data = `grant_type=password&username=${params.username}&password=${params.password}&client_id=${id}&client_secret=${secret}&scope=openid%20profile%20roles%20openid%20roles%20profile`;
  } else if (params.callbackUrl && params.code) {
    data = `client_id=${id}&client_secret=${secret}&grant_type=authorization_code&redirect_uri=${params.callbackUrl}&code=${params.code}`;
  } else {
    throw new Error('Missing data for createIdamToken.');
  }
  return axios.post(tokenUrl, data, { headers });
};

export const getIdamToken = async (
  params: Record<string, string>,
  cacheKey: string
): Promise<AxiosResponse<OidcResponse>> => {
  let response;
  const isCachingEnabled = true;
  if (isCachingEnabled && idamTokenCache.get(cacheKey)) {
    response = idamTokenCache.get(cacheKey);
  } else if (isCachingEnabled) {
    logger.info('Generating access token and then caching it');
    response = await createIdamToken(params);
    idamTokenCache.set(cacheKey, {
      data: { id_token: response.data.id_token, access_token: response.data.access_token },
    });
  } else {
    response = await createIdamToken(params);
  }

  return response;
};

export interface UserDetails {
  accessToken: string;
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  roles: string[];
}

export interface BrowserCase extends Case {
  state: State;
}
