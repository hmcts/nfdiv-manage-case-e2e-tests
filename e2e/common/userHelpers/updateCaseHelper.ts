import { config } from "../../config.ts";

type JsonData = Record<string, any>;

const createTestCase = async (eventName: string, caseData: JsonData) => {
  const CREATE_TEST_CASE_AAT = 'create-test-application';

  const solicitorUserCredentials = config.users.solicitor;
  const caseApi = iGetTheCaseApi(solicitorUserCredentials);
  await caseApi.triggerEvent(userData, eventName);
};

const iGetTheCaseApi = (testUser: UserDetails): CaseApi => {
  const logger = new Logger({
    transports: [new transports.Console(), new transports.File({ filename: 'test.log' })],
  });

  return getCaseApi(testUser, logger);
};

const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(getCaseApiClient(userDetails, logger));
};

export class CaseApiClient {
  readonly maxRetries: number = 3;

  constructor(
    private readonly server: AxiosInstance,
    private readonly logger: LoggerInstance
  ) {}

  public async createCase(serviceType: DivorceOrDissolution, userDetails: UserDetails): Promise<CaseWithId> {
    const CASE_TYPE = 'NFD';
    const EVENT = 'solicitor-test-case';

    const tokenResponse: AxiosResponse<CcdTokenResponse> = await this.server.get(
      `/case-types/${CASE_TYPE}/event-triggers/${EVENT}`
    );
    const token = tokenResponse.data.token;
    const event = { id: EVENT };
    const data = {
      divorceOrDissolution: serviceType,
      applicant1FirstName: userDetails.givenName,
      applicant1LastName: userDetails.familyName,
      applicant1Email: userDetails.email,
    };

    try {
      const response = await this.server.post<CcdV2Response>(`/case-types/${CASE_TYPE}/cases`, {
        data,
        event,
        event_token: token,
      });

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }
}