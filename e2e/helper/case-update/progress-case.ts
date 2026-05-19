import {getIdamToken, OidcResponse, UserDetails} from "../auth/user/user";
import {AxiosResponse} from "axios";
import {jwtDecode} from "jwt-decode";
import {config, UserCredentials} from "../../config";
import {CaseApiClient, getCaseApiClient} from "../case/case-api-client";
import {CITIZEN_UPDATE_CASE_STATE_AAT, DivorceOrDissolution, State} from "../case/definition";

import {Logger} from "@hmcts/nodejs-logging";
import {CaseWithId} from "../case/case";
import {toApiFormat} from "../case/formatter/to-api-format";

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

export const setUsersCaseToState = async (userCaseObj: Partial<CaseWithId>, state: State = State.Draft): Promise<void> => {
  const api = await getApiClientForUser(config.users.solicitor)

  const userCase = await api.findUserCase('NFD', DivorceOrDissolution.DIVORCE);

  if (userCase) {
    const cwApi = await getApiClientForUser(config.users.caseworker)
    userCaseObj.applicant2MiddleNames = state;

    try {
      await cwApi.sendEvent(userCase.id, toApiFormat(userCaseObj), CITIZEN_UPDATE_CASE_STATE_AAT);
    } catch (error) {
      error.logMessage = 'Could not set fixture data as ' + config.users.solicitor.username;
      console.error(error.logMessage);
      process.exit(-1);
    }
  }
};

async function getApiClientForUser(user: UserCredentials): Promise<CaseApiClient> {
  const cwTestUser = await getTestUser({username: user.username, password: user.password});
  return getCaseApiClient(cwTestUser, logger)

}
