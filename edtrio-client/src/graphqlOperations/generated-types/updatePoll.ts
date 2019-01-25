/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePoll
// ====================================================

export interface updatePoll_updatePoll {
  __typename: "Poll";
  votingAllowed: boolean;
  displayResults: boolean;
}

export interface updatePoll {
  updatePoll: updatePoll_updatePoll | null;
}

export interface updatePollVariables {
  pollId: string;
  votingAllowed?: boolean | null;
  displayResults?: boolean | null;
}
