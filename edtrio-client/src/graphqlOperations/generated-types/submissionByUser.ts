/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: submissionByUser
// ====================================================

export interface submissionByUser_submissionByUser {
  __typename: "MultipleChoiceSubmission";
  id: string;
  isChecked: boolean;
}

export interface submissionByUser {
  submissionByUser: submissionByUser_submissionByUser | null;
}

export interface submissionByUserVariables {
  answerId: string;
  userId: string;
}
