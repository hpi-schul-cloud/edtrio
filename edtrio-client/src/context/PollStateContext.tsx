import React, { Component, createContext } from "react";
import { apolloClient } from "../EditorWrapper/apolloClient";

import {
  updatePoll,
  updatePollVariables,
} from "../graphqlOperations/generated-types/updatePoll";

import { POLL_CHANGED, UPDATE_POLL } from "../graphqlOperations/operations";

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
  updateId: (id: string) => void;
  answers: any;
  votingAllowed: boolean;
  updateVotingAllowed: (votingAllowed: boolean) => void;
  displayResults: boolean;
  updateDisplayResults: (displayResults: boolean) => void;
  selectedAnswer: any;
  updateSelectedAnswer: (selectedAnswer: any) => void;
}

export const PollStateContext = createContext<IPollStateProviderState>({
  id: "",
  updateId: (id: string) => {},
  answers: [],
  votingAllowed: false,
  updateVotingAllowed: (votingAllowed: boolean) => {},
  displayResults: false,
  updateDisplayResults: (displayResults: boolean) => {},
  selectedAnswer: null,
  updateSelectedAnswer: (selectedAnswer: any) => {},
});

export class PollStateProvider extends Component<{}, IPollStateProviderState> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: "",
      updateId: this.updateId,
      answers: [],
      selectedAnswer: null,
      updateSelectedAnswer: this.updateSelectedAnswer,
      votingAllowed: false,
      updateVotingAllowed: this.updateVotingAllowed,
      displayResults: false,
      updateDisplayResults: this.updateDisplayResults,
    };
  }

  public updateId = (id: string) => {
    this.setState({ id });
  };

  public updateSelectedAnswer = (newSelectedAnswer: any) => {
    this.setState({ selectedAnswer: newSelectedAnswer });
  };

  public updateVotingAllowed = (votingAllowed: boolean) => {
    apolloClient.mutate<updatePoll, updatePollVariables>({
      mutation: UPDATE_POLL,
      variables: { pollId: this.state.id, votingAllowed },
    });
  };

  public updateDisplayResults = (displayResults: boolean) => {
    apolloClient.mutate<updatePoll, updatePollVariables>({
      mutation: UPDATE_POLL,
      variables: { pollId: this.state.id, displayResults },
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
