import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import dotenv from 'dotenv';
import { LoggerInstance } from 'winston';

import {getServiceAuthToken} from '../auth/service/get-service-auth-token';
import { UserDetails } from '../auth/user/user';

import {CaseWithId, State} from './definition';
import {CaseData} from "./caseData.ts";

dotenv.config();

export class CaseApiClient {
  readonly maxRetries: number = 3;

  constructor(
    private readonly server: AxiosInstance,
    private readonly logger: LoggerInstance
  ) {}

  public async findUserCase(caseType: string, serviceType: string): Promise<CcdV1Response | false> {
    const query = {
      query: { match_all: {} },
      sort: [{ created_date: { order: 'desc' } }],
    };
    try {
      const response = await this.server.post<ES<CcdV1Response>>(`/searchCases?ctid=${caseType}`, JSON.stringify(query));
      const foundCase = response.data.cases.filter(c => c.case_data.divorceOrDissolution === serviceType)[0];
      this.logger.info(`Found case with case id: ${foundCase.id}`);
      return  foundCase;
    } catch (err) {
      if (err.response?.status === 404) {
        return false;
      }
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

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

export const getCaseApiClient = (userDetails: UserDetails, logger: LoggerInstance): CaseApiClient => {
  return new CaseApiClient(
    axios.create({
      baseURL: process.env.CASE_API_BASE_URL,
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        ServiceAuthorization: getServiceAuthToken(),
        experimental: 'true',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }),
    logger
  );
};

interface ES<T> {
  cases: T[];
  total: number;
}

export interface CcdV1Response {
  id: string;
  state: State;
  created_date: string;
  case_data: CaseData;
}

interface CcdV2Response {
  id: string;
  state: State;
  data: CaseData;
}

interface CcdTokenResponse {
  token: string;
}
