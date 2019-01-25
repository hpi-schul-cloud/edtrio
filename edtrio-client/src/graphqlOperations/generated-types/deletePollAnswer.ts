/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deletePollAnswer
// ====================================================

export interface deletePollAnswer_deletePollAnswer {
  __typename: "PollAnswer";
  id: string;
}

export interface deletePollAnswer {
  deletePollAnswer: deletePollAnswer_deletePollAnswer | null;
}

export interface deletePollAnswerVariables {
  pollAnswerId: string;
}
