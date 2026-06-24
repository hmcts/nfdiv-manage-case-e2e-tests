import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import dotenv from 'dotenv';
import { LoggerInstance } from 'winston';

import {getServiceAuthToken} from '../auth/service/get-service-auth-token';
import { UserDetails } from '../auth/user/user';

import {CaseWithId, SOLICITOR_CREATE_CASE, State} from './definition';
import {CaseData} from "./caseData.ts";

dotenv.config();

export class CaseApiClient {
  readonly maxRetries: number = 3;

  constructor(
    private readonly server: AxiosInstance,
    private readonly logger: LoggerInstance
  ) {}

  public async sendEvent(caseId: string, data: Partial<CaseWithId>, eventName: string, retries = 0): Promise<Partial<CaseWithId>> {
    try {
      const tokenResponse = await this.server.get<CcdTokenResponse>(`/cases/${caseId}/event-triggers/${eventName}`);
      const token = tokenResponse.data.token;
      const event = { id: eventName };
      const response: AxiosResponse<CcdV2Response> = await this.server.post(`/cases/${caseId}/events`, {
        event,
        data,
        event_token: token,
      });

      return { id: response.data.id, state: response.data.state, ...response.data.data };
    } catch (err) {
      if (retries < this.maxRetries && [409, 422, 502, 504].includes(err?.response.status)) {
        ++retries;
        this.logger.info(`retrying send event due to ${err.response.status}. this is retry no (${retries})`);
        return this.sendEvent(caseId, data, eventName, retries);
      }
      this.logError(err);
      throw new Error('Case could not be updated.');
    }
  }


  public async createCase(caseData: Partial<CaseWithId>): Promise<CaseWithId> {
    const tokenResponse: AxiosResponse<CcdTokenResponse> = await this.server.get(
      `/case-types/NFD/event-triggers/${SOLICITOR_CREATE_CASE}`
    );
    const token = tokenResponse.data.token;
    const event = { id: SOLICITOR_CREATE_CASE };
    const data = {
      ...caseData ,
    };

    try {
      const response = await this.server.post<CcdV2Response>(`/case-types/NFD/cases`, {
        data,
        event,
        event_token: token,
      });

      return { id: response.data.id, state: response.data.state, ...response.data.data };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }

  private logError(error: AxiosError) {
    if (error.response) {
      this.logger.error(`API Error ${error.config?.method} ${error.config?.url} ${error.response.status}`);
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      this.logger.error(`API Error ${error.config?.method} ${error.config?.url}`);
    } else {
      this.logger.error('API Error', error.message);
    }
  }
}

export const getCaseApiClient = async (userDetails: UserDetails, logger: LoggerInstance): Promise<CaseApiClient> => {
  return new CaseApiClient(
    axios.create({
      baseURL: process.env.CASE_API_BASE_URL,
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        ServiceAuthorization: await getServiceAuthToken(),
        experimental: 'true',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }),
    logger
  );
};

interface CcdV2Response {
  id: string;
  state: State;
  data: CaseData;
}

interface CcdTokenResponse {
  token: string;
}
