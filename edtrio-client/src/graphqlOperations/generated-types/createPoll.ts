/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPoll
// ====================================================

export interface createPoll_createPoll {
  __typename: "Poll";
  id: string;
  votingAllowed: boolean;
  displayResults: boolean;
}

export interface createPoll {
  createPoll: createPoll_createPoll | null;
}

export interface createPollVariables {
  votingAllowed: boolean;
  displayResults: boolean;
}
