/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: multipleChoiceAnswer
// ====================================================

export interface multipleChoiceAnswer_multipleChoiceAnswer {
  __typename: "MultipleChoiceAnswer";
  id: string;
  isCorrect: boolean;
}

export interface multipleChoiceAnswer {
  multipleChoiceAnswer: multipleChoiceAnswer_multipleChoiceAnswer | null;
}

export interface multipleChoiceAnswerVariables {
  answerId: string;
}
