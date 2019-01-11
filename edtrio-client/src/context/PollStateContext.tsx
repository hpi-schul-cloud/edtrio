import React, { Component, createContext } from "react";

export const PollStateContext = createContext<IPollStateProviderState>({
  selectedAnswer: null,
  updateSelectedAnswer: (selectedAnswer: any) => {},
  locked: true,
  updateLocked: (locked: boolean) => {},
  showResults: false,
  updateShowResults: (showresults: boolean) => {},
});

interface IPollStateProviderProps {}

interface IPollStateProviderState {
  selectedAnswer: any;
  updateSelectedAnswer: (selectedAnswer: any) => void;
  locked: boolean;
  updateLocked: (locked: boolean) => void;
  showResults: boolean;
  updateShowResults: (locked: boolean) => void;
}

export class PollStateProvider extends Component<
  IPollStateProviderProps,
  IPollStateProviderState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedAnswer: null,
      updateSelectedAnswer: this.updateSelectedAnswer,
      locked: true,
      updateLocked: this.updateLocked,
      showResults: false,
      updateShowResults: this.updateShowResults,
    };
  }

  public updateSelectedAnswer = (newSelectedAnswer: any) => {
    this.setState({ selectedAnswer: newSelectedAnswer });
  };

  public updateLocked = (locked: boolean) => {
    this.setState({ locked });
  };

  public updateShowResults = (showResults: boolean) => {
    this.setState({ showResults });
  };

  public render() {
    return (
      <PollStateContext.Provider value={this.state}>
        {this.props.children}
      </PollStateContext.Provider>
    );
  }
}
