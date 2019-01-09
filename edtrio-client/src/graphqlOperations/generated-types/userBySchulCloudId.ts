/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userBySchulCloudId
// ====================================================

export interface userBySchulCloudId_userBySchulCloudId {
  __typename: "User";
  id: string;
  name: string;
  isTeacher: boolean;
  schulCloudId: string | null;
}

export interface userBySchulCloudId {
  userBySchulCloudId: userBySchulCloudId_userBySchulCloudId | null;
}

export interface userBySchulCloudIdVariables {
  schulCloudId: string;
}
