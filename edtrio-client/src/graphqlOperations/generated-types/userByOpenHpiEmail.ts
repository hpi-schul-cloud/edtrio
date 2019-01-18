/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userByOpenHpiEmail
// ====================================================

export interface userByOpenHpiEmail_userByOpenHpiEmail {
  __typename: "User";
  id: string;
  name: string;
  isTeacher: boolean;
}

export interface userByOpenHpiEmail {
  userByOpenHpiEmail: userByOpenHpiEmail_userByOpenHpiEmail | null;
}

export interface userByOpenHpiEmailVariables {
  openHpiEmail: string;
}
