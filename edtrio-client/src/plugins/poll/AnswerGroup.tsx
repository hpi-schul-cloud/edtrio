import React from "react";

export default class PollAnswerGroupNode extends React.Component<{}> {
  public render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
