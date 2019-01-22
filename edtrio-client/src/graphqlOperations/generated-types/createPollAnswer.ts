/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPollAnswer
// ====================================================

export interface createPollAnswer_createPollAnswer {
  __typename: "PollAnswer";
  id: string;
}

export interface createPollAnswer {
  createPollAnswer: createPollAnswer_createPollAnswer | null;
}

export interface createPollAnswerVariables {
  pollId: string;
}
