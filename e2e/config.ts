import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// This needs to be placed somewhere before attempting to access any environment variables
dotenv.config();

export interface UserCredentials {
  username: string;
  password: string;
  sessionFile: string;
  cookieName?: string;
}

interface Urls {
  exuiDefaultUrl: string;
  manageCaseBaseUrl: string;
}

interface Files {
  doc: string;
  mp3: string;
  odt: string;
  pdf: string;
  txt: string;
}

export interface Config {
  users: {
    solicitor: UserCredentials;
    caseworker: UserCredentials;
    legalAdvisor: UserCredentials;
  };
  urls: Urls;
  files: Files;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config: Config = {
  users: {
    solicitor: {
      username: getEnvVar("SOLICITOR_USERNAME"),
      password: getEnvVar("SOLICITOR_PASSWORD"),
      sessionFile: path.join(
        __dirname,
        ".sessions",
        `${getEnvVar("SOLICITOR_USERNAME")}.json`),
      cookieName: "xui-webapp",
    },
    caseworker: {
      username: getEnvVar("CASEWORKER_USERNAME"),
      password: getEnvVar("CASEWORKER_PASSWORD"),
      sessionFile: path.join(
        __dirname,
        ".sessions",
        `${getEnvVar("CASEWORKER_PASSWORD")}.json`),
      cookieName: "xui-webapp",
    },
    legalAdvisor: {
      username: getEnvVar("LEGALADVISOR_USERNAME"),
      password: getEnvVar("LEGALADVISOR_PASSWORD"),
      sessionFile: path.join(
        __dirname,
        ".sessions",
        `${getEnvVar("LEGALADVISOR_USERNAME")}.json`),
      cookieName: "xui-webapp",
    },
  },
  urls: {
    exuiDefaultUrl: "https://manage-case.aat.platform.hmcts.net",
    manageCaseBaseUrl:
      process.env.MANAGE_CASES_BASE_URL ||
      "https://manage-case.aat.platform.hmcts.net/cases",
  },
  files: {
    doc: path.resolve(__dirname, './assets/mockFile.docx'),
    mp3: path.resolve(__dirname, './assets/mockFile.mp3'),
    odt: path.resolve(__dirname, './assets/mockFile.odt'),
    pdf: path.resolve(__dirname, './assets/mockFile.pdf'),
    txt: path.resolve(__dirname, './assets/mockFile.txt'),
  }
};

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Error: ${name} environment variable is not set`);
  }
  return value;
}


