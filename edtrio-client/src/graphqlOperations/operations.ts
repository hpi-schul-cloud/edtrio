import gql from "graphql-tag";

export const UPDATE_DOCUMENT = gql`
  mutation updateDocument(
    $documentId: String!
    $value: String!
    $userIds: [String!]!
  ) {
    updateDocument(value: $value, documentId: $documentId, userIds: $userIds) {
      id
      value
    }
  }
`;

// get to document value
export const DOCUMENT_QUERY = gql`
  query document($documentId: String!) {
    document(documentId: $documentId) {
      value
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
    deletePoll(pollId: $pollId) { }
  }
`;

export const UPDATE_POLL = gql`
  mutation updatePoll($pollId: String!, votingAllowed: Boolean, displayResults: Boolean) {
    updatePoll(pollId: $pollId, votingAllowed: $votingAllowed, displayResults: $displayResults) {
      votingALlowed
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
    deletePollAnswer(pollAnswerId: $pollAnswerId) { }
  }
`;

export const ADD_USER_TO_POLL_ANSWER = gql`
  mutation addUserToPollAnswer($pollAnswerId: String!, userId: String!) {
    addUserToPollAnswer(pollAnswerId: $pollAnswerId, userId: $userId) { }
  }
`;

export const POLL_CHANGED = gql`
  subscription pollChanged($pollId: String!) {
    pollChanged(pollId: $pollId) {
      answers {
        votes {
          id
        }
      }
    }
  }
`;
