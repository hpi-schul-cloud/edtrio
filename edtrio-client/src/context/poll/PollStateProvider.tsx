import React, { Component } from "react";
import { apolloClient } from "../../EditorWrapper/apolloClient";

import {
  updatePoll,
  updatePollVariables,
} from "../../graphqlOperations/generated-types/updatePoll";

import {
  POLL_CHANGED,
  POLL_QUERY,
  UPDATE_POLL,
} from "../../graphqlOperations/operations";

import { IPollStateProviderState, PollStateContext } from "./PollStateContext";
import { PollSubscription } from "./PollSubscription";

export class PollStateProvider extends Component<{}, IPollStateProviderState> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: "",
      answers: [],
      selectedAnswer: "",
      updateSelectedAnswer: this.updateSelectedAnswer,
      votingAllowed: false,
      updateVotingAllowed: this.updateVotingAllowed,
      displayResults: false,
      updateDisplayResults: this.updateDisplayResults,
      getUsersWhoHaveVoted: this.getUsersWhoHaveVoted,
      getAnswerInformation: this.getAnswerInformation,
      getTotalVotes: this.getTotalVotes,
      initState: this.initState,
    };
  }

  public initState = (
    id: string,
    votingAllowed: boolean,
    displayResults: boolean,
    answers: any,
    currentUser: any,
  ) => {
    const selectedAnswer = this.getSelectedAnswer(answers, currentUser);
    this.setState({
      id,
      selectedAnswer,
      votingAllowed,
      displayResults,
      answers,
    });
  };

  public updateSelectedAnswer = (newSelectedAnswer: string) => {
    this.setState({ selectedAnswer: newSelectedAnswer });
  };

  public getUsersWhoHaveVoted = () => {
    return this.state.answers
      .map(answer => answer.votes.map(vote => vote.id))
      .flat();
  };

  public getAnswerInformation = (pollAnswerId: string) => {
    const answer = this.state.answers.find(
      pollAnswer => pollAnswer.id === pollAnswerId,
    );
    if (answer) {
      const votesCount = answer.votes.length;
      const leadingCount = Math.max(
        ...this.state.answers.map(a => a.votes.length),
      );
      const isLeading = votesCount === leadingCount;
      return {
        votesCount,
        isLeading,
      };
    }
    return {
      votesCount: 0,
      isLeading: false,
    };
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
              votingAllowed !== this.state.votingAllowed ||
              displayResults !== this.state.displayResults ||
              JSON.stringify(answers) !== JSON.stringify(this.state.answers)
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

  private getSelectedAnswer = (answers: any, currentUser: any) => {
    const answer = answers.find(pollAnswer =>
      pollAnswer.votes.map(user => user.id).includes(currentUser.id),
    );
    return answer ? answer.id : "";
  };
}
