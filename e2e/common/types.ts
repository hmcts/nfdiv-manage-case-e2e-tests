export interface UserLoginInfo {
  username: string;
  password: string;
}

const UserRoles = {
  solicitor: "solicitor",
  caseworker: "caseworker",
  legalAdvisor: "legalAdvisor"
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export { UserRoles };

export enum Events {
  signAndSubmit = "Sign and submit"
}
