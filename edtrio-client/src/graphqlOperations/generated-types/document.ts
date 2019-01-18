/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: document
// ====================================================

export interface document_document_users {
  __typename: "User";
  id: string;
  name: string;
  isTeacher: boolean;
}

export interface document_document {
  __typename: "Document";
  value: any;
  users: document_document_users[] | null;
}

export interface document {
  document: document_document | null;
}

export interface documentVariables {
  documentId: string;
}
