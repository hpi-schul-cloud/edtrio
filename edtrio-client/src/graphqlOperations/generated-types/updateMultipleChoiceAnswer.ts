/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateMultipleChoiceAnswer
// ====================================================

export interface updateMultipleChoiceAnswer_updateMultipleChoiceAnswer {
  __typename: "MultipleChoiceAnswer";
  id: string;
  isCorrect: boolean;
}

export interface updateMultipleChoiceAnswer {
  updateMultipleChoiceAnswer: updateMultipleChoiceAnswer_updateMultipleChoiceAnswer | null;
}

export interface updateMultipleChoiceAnswerVariables {
  answerId: string;
  isCorrect: boolean;
}
