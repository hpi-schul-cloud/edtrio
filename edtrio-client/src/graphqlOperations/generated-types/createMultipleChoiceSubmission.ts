/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createMultipleChoiceSubmission
// ====================================================

export interface createMultipleChoiceSubmission_createMultipleChoiceSubmission {
  __typename: "MultipleChoiceSubmission";
  id: string;
}

export interface createMultipleChoiceSubmission {
  createMultipleChoiceSubmission: createMultipleChoiceSubmission_createMultipleChoiceSubmission | null;
}

export interface createMultipleChoiceSubmissionVariables {
  isChecked: boolean;
  answerId: string;
  userId: string;
}
