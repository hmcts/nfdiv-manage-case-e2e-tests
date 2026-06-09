import {getIdamToken, OidcResponse, UserDetails} from "../auth/user/user";
import {AxiosResponse} from "axios";
import {jwtDecode} from "jwt-decode";
import {config, UserCredentials} from "../../config";
import {CaseApiClient, getCaseApiClient} from "../case/case-api-client";
import {CaseWithId, CITIZEN_UPDATE_CASE_STATE_AAT, State} from "../case/definition";

import {Logger} from "@hmcts/nodejs-logging";

const logger = Logger.getLogger('progress-case');

export const getTestUser = async (user: { username: string; password: string }): Promise<UserDetails> => {
  const params = { username: user.username, password: user.password };
  const response: AxiosResponse<OidcResponse> = await getIdamToken(params, params.username);

  const jwt = jwtDecode(response.data.id_token) as {
    uid: string;
    sub: string;
    given_name: string;
    family_name: string;
    roles: string[];
  };

  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
    roles: jwt.roles,
  };
};

export const createSolicitorTestCase = async (fixture: Partial<CaseWithId>): Promise<CaseWithId> => {
  const api = await getApiClientForUser(config.users.solicitor)
  const userCase = await api.createCase(fixture);
  logger.info(`Created case with id: ${userCase.id}`);

  return userCase;
};

export const setUsersCaseToState = async (caseId: string, state: State = State.Submitted): Promise<void> => {
  const cwApi = await getApiClientForUser(config.users.caseworker)

  try {
    logger.info(`Setting user state to: ${state}`);

    await cwApi.sendEvent(caseId, {applicant2MiddleName: state}, CITIZEN_UPDATE_CASE_STATE_AAT);
  } catch (error) {
    error.logMessage = 'Could not set state as ' + config.users.solicitor.username;
    console.error(error.logMessage);
    process.exit(-1);
  }
};

async function getApiClientForUser(user: UserCredentials): Promise<CaseApiClient> {
  const cwTestUser = await getTestUser({username: user.username, password: user.password});
  return getCaseApiClient(cwTestUser, logger)

}
