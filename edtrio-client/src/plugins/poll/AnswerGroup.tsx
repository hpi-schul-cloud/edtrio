import React from "react";
import { Block, Editor } from "slate";

export default class PollAnswerGroupNode extends React.Component<{}> {
  public render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
