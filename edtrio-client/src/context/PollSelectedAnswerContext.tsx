import React, { Component, createContext } from "react";

export const PollSelectedAnswerContext = createContext<
  IPollSelectedAnswerProviderState
>({
  selectedAnswer: true,
  updateSelectedAnswer: (newSelectedAnswer: boolean) => {},
});

interface IPollSelectedAnswerProviderProps {}

interface IPollSelectedAnswerProviderState {
  selectedAnswer: any;
  updateSelectedAnswer: (selectedAnswer: any) => void;
}

export class PollSelectedAnswerProvider extends Component<
  IPollSelectedAnswerProviderProps,
  IPollSelectedAnswerProviderState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedAnswer: null,
      updateSelectedAnswer: this.updateSelectedAnswer,
    };
  }

  public updateSelectedAnswer = (newSelectedAnswer: any) => {
    this.setState({ selectedAnswer: newSelectedAnswer });
  };

  public render() {
    return (
      <PollSelectedAnswerContext.Provider value={this.state}>
        {this.props.children}
      </PollSelectedAnswerContext.Provider>
    );
  }
}
