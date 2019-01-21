import gql from "graphql-tag";

export const CREATE_POLL = gql`
  mutation createPoll($votingAllowed: Boolean!, $displayResults: Boolean!) {
    createPoll(votingAllowed: $votingAllowed, displayResults: $displayResults) {
      id
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
