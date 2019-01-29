import React, { Component, createContext } from "react";
import { apolloClient } from "../EditorWrapper/apolloClient";

import {
  updatePoll,
  updatePollVariables,
} from "../graphqlOperations/generated-types/updatePoll";

import {
  POLL_CHANGED,
  POLL_QUERY,
  UPDATE_POLL,
} from "../graphqlOperations/operations";

import { any } from "prop-types";
import { Subscription } from "react-apollo";
import {
  pollChanged,
  pollChangedVariables,
} from "../graphqlOperations/generated-types/pollChanged";

class PollSubscription extends Subscription<
  pollChanged,
  pollChangedVariables
> {}

interface IPollStateProviderState {
  id: string;
  answers: any;
  votingAllowed: boolean;
  updateVotingAllowed: (votingAllowed: boolean) => void;
  displayResults: boolean;
  updateDisplayResults: (displayResults: boolean) => void;
  selectedAnswer: any;
  updateSelectedAnswer: (selectedAnswer: any) => void;
  getUsersWhoHaveVoted: () => any;
  getVotesForAnswer: (pollAnswerId: string) => any[];
  getTotalVotes: () => any;
  initState: (
    id: string,
    votingAllowed: boolean,
    displayResults: boolean,
    answers: any,
  ) => void;
}

export const PollStateContext = createContext<IPollStateProviderState>({
  id: "",
  answers: [],
  votingAllowed: false,
  updateVotingAllowed: (votingAllowed: boolean) => {},
  displayResults: false,
  updateDisplayResults: (displayResults: boolean) => {},
  selectedAnswer: null,
  updateSelectedAnswer: (selectedAnswer: any) => {},
  getUsersWhoHaveVoted: () => {},
  getVotesForAnswer: (pollAnswerId: string) => [],
  getTotalVotes: () => [],
  initState: (
    id: string,
    votingAllowed: boolean,
    displayResults: boolean,
    answers: any,
  ) => {},
});

export class PollStateProvider extends Component<{}, IPollStateProviderState> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: "",
      answers: [],
      selectedAnswer: null,
      updateSelectedAnswer: this.updateSelectedAnswer,
      votingAllowed: false,
      updateVotingAllowed: this.updateVotingAllowed,
      displayResults: false,
      updateDisplayResults: this.updateDisplayResults,
      getUsersWhoHaveVoted: this.getUsersWhoHaveVoted,
      getVotesForAnswer: this.getVotesForAnswer,
      getTotalVotes: this.getTotalVotes,
      initState: this.initState,
    };
  }

  public initState = (
    id: string,
    votingAllowed: boolean,
    displayResults: boolean,
    answers: any,
  ) => {
    this.setState({ id, votingAllowed, displayResults, answers });
  };

  public updateSelectedAnswer = (newSelectedAnswer: any) => {
    this.setState({ selectedAnswer: newSelectedAnswer });
  };

  public getUsersWhoHaveVoted = () => {
    return this.state.answers
      .map(answer => answer.votes.map(vote => vote.id))
      .flat();
  };

  public getVotesForAnswer = (pollAnswerId: string) => {
    const answer = this.state.answers.find(
      answer => answer.id === pollAnswerId,
    );
    return answer ? answer.votes.length : 0;
  };

  public getTotalVotes = () => {
    return this.state.answers.length === 0
      ? 0
      : this.getUsersWhoHaveVoted().length;
  };

  public updateVotingAllowed = (votingAllowed: boolean) => {
    apolloClient.mutate<updatePoll, updatePollVariables>({
      mutation: UPDATE_POLL,
      variables: { pollId: this.state.id, votingAllowed },
      refetchQueries: [
        {
          query: POLL_QUERY,
          variables: { pollId: this.state.id },
        },
      ],
    });
  };

  public updateDisplayResults = (displayResults: boolean) => {
    apolloClient.mutate<updatePoll, updatePollVariables>({
      mutation: UPDATE_POLL,
      variables: { pollId: this.state.id, displayResults },
      refetchQueries: [
        {
          query: POLL_QUERY,
          variables: { pollId: this.state.id },
        },
      ],
    });
  };

  public render() {
    return (
      <PollSubscription
        subscription={POLL_CHANGED}
        variables={{ pollId: this.state.id }}
      >
        {({ data: subscriptionData }) => {
          if (subscriptionData && subscriptionData.pollChanged) {
            const {
              votingAllowed,
              displayResults,
              answers,
            } = subscriptionData.pollChanged;

            if (
              votingAllowed != this.state.votingAllowed ||
              displayResults != this.state.displayResults ||
              JSON.stringify(answers) != JSON.stringify(this.state.answers)
            ) {
              this.setState({
                votingAllowed,
                displayResults,
                answers,
              });
            }
          }
          return (
            <PollStateContext.Provider value={this.state}>
              {this.props.children}
            </PollStateContext.Provider>
          );
        }}
      </PollSubscription>
    );
  }
}
