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
  citizen: "citizen",
  caseworker: "caseworker",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export { UserRoles };
