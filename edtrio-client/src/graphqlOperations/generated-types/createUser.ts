/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser {
  __typename: "User";
  id: string;
  isTeacher: boolean;
  name: string;
}

export interface createUser {
  createUser: createUser_createUser | null;
}

export interface createUserVariables {
  name: string;
  isTeacher: boolean;
}
