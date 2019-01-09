import gql from "graphql-tag";

export const CREATE_MULTIPLE_CHOICE_ANSWER = gql`
  mutation createMultipleChoiceAnswer($isCorrect: Boolean!) {
    createMultipleChoiceAnswer(isCorrect: $isCorrect) {
      id
    }
  }
`;

export const UPDATE_MULTIPLE_CHOICE_ANSWER = gql`
  mutation updateMultipleChoiceAnswer(
    $answerId: String!
    $isCorrect: Boolean!
  ) {
    updateMultipleChoiceAnswer(answerId: $answerId, isCorrect: $isCorrect) {
      id
      isCorrect
    }
  }
`;

export const DELETE_MULTIPLE_CHOICE_ANSWER = gql`
  mutation deleteMultipleChoiceAnswer($answerId: String!) {
    deleteMultipleChoiceAnswer(answerId: $answerId) {
      id
    }
  }
`;

export const MULTIPLE_CHOICE_ANSWER = gql`
  query multipleChoiceAnswer($answerId: String!) {
    multipleChoiceAnswer(answerId: $answerId) {
      id
      isCorrect
    }
  }
`;

export const MULTIPLE_CHOICE_SUBMISSION = gql`
  query submissionByUser($answerId: String!, $userId: String!) {
    submissionByUser(answerId: $answerId, userId: $userId) {
      id
      isChecked
    }
  }
`;

export const CREATE_MULTIPLE_CHOICE_SUBMISSION = gql`
  mutation createMultipleChoiceSubmission(
    $isChecked: Boolean!
    $answerId: String!
    $userId: String!
  ) {
    createMultipleChoiceSubmission(
      isChecked: $isChecked
      answerId: $answerId
      userId: $userId
    ) {
      id
    }
  }
`;

export const UPDATE_MULTIPLE_CHOICE_SUBMISSION = gql`
  mutation updateMultipleChoiceSubmission(
    $submissionId: String!
    $isChecked: Boolean!
  ) {
    updateMultipleChoiceSubmission(
      submissionId: $submissionId
      isChecked: $isChecked
    ) {
      id
      isChecked
    }
  }
`;

// get to document value
export const DOCUMENT_QUERY = gql`
  query document($documentId: String!) {
    document(documentId: $documentId) {
      value
      users {
        id
        name
        isTeacher
      }
    }
  }
`;

// establish a subscription to get the document value
export const VALUE_SUBSCRIPTION = gql`
  subscription valueChanged($documentId: String!) {
    valueChanged(documentId: $documentId) {
      value
    }
  }
`;

export const UPDATE_DOCUMENT = gql`
  mutation updateDocument($documentId: String!, $value: Json!) {
    updateDocument(value: $value, documentId: $documentId) {
      id
      value
    }
  }
`;