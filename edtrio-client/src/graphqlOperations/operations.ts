import gql from "graphql-tag";

export const CREATE_MULTIPLE_CHOICE_ANSWER = gql`
  mutation createMultipleChoiceAnswer($isCorrect: Boolean!) {
    createMultipleChoiceAnswer(isCorrect: $isCorrect) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $isTeacher: Boolean!) {
    createUser(name: $name, isTeacher: $isTeacher) {
      id
      isTeacher
      name
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
      isChecked
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

export const POLL_QUERY = gql`
  query poll($pollId: String!) {
    poll(pollId: $pollId) {
      votingAllowed
      displayResults
      answers {
        id
        votes {
          id
        }
      }
    }
  }
`;

export const CREATE_POLL = gql`
  mutation createPoll($votingAllowed: Boolean!, $displayResults: Boolean!) {
    createPoll(votingAllowed: $votingAllowed, displayResults: $displayResults) {
      id
      votingAllowed
      displayResults
    }
  }
`;

export const DELETE_POLL = gql`
  mutation deletePoll($pollId: String!) {
    deletePoll(pollId: $pollId) {
      id
    }
  }
`;

export const UPDATE_POLL = gql`
  mutation updatePoll(
    $pollId: String!
    $votingAllowed: Boolean
    $displayResults: Boolean
  ) {
    updatePoll(
      pollId: $pollId
      votingAllowed: $votingAllowed
      displayResults: $displayResults
    ) {
      votingAllowed
      displayResults
    }
  }
`;

export const CREATE_POLL_ANSWER = gql`
  mutation createPollAnswer($pollId: String!) {
    createPollAnswer(pollId: $pollId) {
      id
    }
  }
`;

export const DELETE_POLL_ANSWER = gql`
  mutation deletePollAnswer($pollAnswerId: String!) {
    deletePollAnswer(pollAnswerId: $pollAnswerId) {
      id
    }
  }
`;

export const ADD_SUBMISSION_TO_POLL_ANSWER = gql`
  mutation addSubmissionToPollAnswer(
    $pollId: String!
    $pollAnswerId: String!
    $userId: String!
  ) {
    addSubmissionToPollAnswer(
      pollId: $pollId
      pollAnswerId: $pollAnswerId
      userId: $userId
    ) {
      id
    }
  }
`;

export const POLL_CHANGED = gql`
  subscription pollChanged($pollId: String!) {
    pollChanged(pollId: $pollId) {
      displayResults
      votingAllowed
      answers {
        id
        votes {
          id
        }
      }
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
