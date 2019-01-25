/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deletePoll
// ====================================================

export interface deletePoll_deletePoll {
  __typename: "Poll";
  id: string;
}

export interface deletePoll {
  deletePoll: deletePoll_deletePoll | null;
}

export interface deletePollVariables {
  pollId: string;
}
