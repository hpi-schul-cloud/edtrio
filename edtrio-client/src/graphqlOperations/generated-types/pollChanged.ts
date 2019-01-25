/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: pollChanged
// ====================================================

export interface pollChanged_pollChanged_answers_votes {
  __typename: "User";
  id: string;
}

export interface pollChanged_pollChanged_answers {
  __typename: "PollAnswer";
  votes: pollChanged_pollChanged_answers_votes[] | null;
}

export interface pollChanged_pollChanged {
  __typename: "Poll";
  answers: pollChanged_pollChanged_answers[] | null;
}

export interface pollChanged {
  pollChanged: pollChanged_pollChanged | null;
}

export interface pollChangedVariables {
  pollId: string;
}
