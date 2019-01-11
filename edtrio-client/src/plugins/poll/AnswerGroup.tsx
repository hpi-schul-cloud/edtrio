import React from "react";
import { PollSelectedAnswerProvider } from "../../context/PollSelectedAnswerContext";

export default class PollAnswerGroupNode extends React.Component<{}> {
  public render() {
    const { children } = this.props;
    return <PollSelectedAnswerProvider>{children}</PollSelectedAnswerProvider>;
  }
}
