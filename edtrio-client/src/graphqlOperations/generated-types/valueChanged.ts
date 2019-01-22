/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: valueChanged
// ====================================================

export interface valueChanged_valueChanged {
  __typename: "Document";
  value: string;
}

export interface valueChanged {
  valueChanged: valueChanged_valueChanged | null;
}

export interface valueChangedVariables {
  documentId: string;
}
