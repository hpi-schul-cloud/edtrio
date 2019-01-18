/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateMultipleChoiceSubmission
// ====================================================

export interface updateMultipleChoiceSubmission_updateMultipleChoiceSubmission {
  __typename: "MultipleChoiceSubmission";
  id: string;
  isChecked: boolean;
}

export interface updateMultipleChoiceSubmission {
  updateMultipleChoiceSubmission: updateMultipleChoiceSubmission_updateMultipleChoiceSubmission | null;
}

export interface updateMultipleChoiceSubmissionVariables {
  submissionId: string;
  isChecked: boolean;
}
