export interface UserLoginInfo {
  username: string;
  password: string;
}

export interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

export interface UserCredentialsLong extends UserCredentials {
  readonly forename: string;
  readonly surname: string;
}

const UserRoles = {
  solicitor: "solicitor",
  caseworker: "caseworker",
  legalAdvisor: "legalAdvisor"
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export { UserRoles };
