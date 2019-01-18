/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateDocument
// ====================================================

export interface updateDocument_updateDocument {
  __typename: "Document";
  id: string;
  value: any;
}

export interface updateDocument {
  updateDocument: updateDocument_updateDocument | null;
}

export interface updateDocumentVariables {
  documentId: string;
  value: any;
}
