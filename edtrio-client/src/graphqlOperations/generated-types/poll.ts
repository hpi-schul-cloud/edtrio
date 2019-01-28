/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: poll
// ====================================================

export interface poll_poll {
  __typename: "Poll";
  id: string;
  votingAllowed: boolean;
  displayResults: boolean;
}

export interface poll {
  poll: poll_poll | null;
}

export interface pollVariables {
  pollId: string;
}
