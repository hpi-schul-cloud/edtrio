import React, { Component, createContext } from "react";

interface IPollStateProviderState {
  id: string;
  updateId: (id: string) => void;
  answers: any[];
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

interface IPollStateProviderProps {}

export class PollStateProvider extends Component<
  IPollStateProviderProps,
  IPollStateProviderState
> {
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
    this.setState({ votingAllowed });
  };

  public updateDisplayResults = (displayResults: boolean) => {
    this.setState({ displayResults });
  };

  public render() {
    return (
      <PollStateContext.Provider value={this.state}>
        {this.props.children}
      </PollStateContext.Provider>
    );
  }
}
