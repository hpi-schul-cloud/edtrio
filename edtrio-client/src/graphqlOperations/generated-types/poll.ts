/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: poll
// ====================================================

export interface poll_poll_answers_votes {
  __typename: "User";
  id: string;
}

export interface poll_poll_answers {
  __typename: "PollAnswer";
  id: string;
  votes: poll_poll_answers_votes[] | null;
}

export interface poll_poll {
  __typename: "Poll";
  votingAllowed: boolean;
  displayResults: boolean;
  answers: poll_poll_answers[] | null;
}

export interface poll {
  poll: poll_poll | null;
}

export interface pollVariables {
  pollId: string;
}
