/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addSubmissionToPollAnswer
// ====================================================

export interface addSubmissionToPollAnswer_addSubmissionToPollAnswer {
  __typename: "PollAnswer";
  id: string;
}

export interface addSubmissionToPollAnswer {
  addSubmissionToPollAnswer: addSubmissionToPollAnswer_addSubmissionToPollAnswer | null;
}

export interface addSubmissionToPollAnswerVariables {
  pollId: string;
  pollAnswerId: string;
  userId: string;
}
