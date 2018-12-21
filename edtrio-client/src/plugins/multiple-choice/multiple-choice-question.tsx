import React, { PureComponent } from "react";

import { Editor, Node } from "slate";

interface IMultipleChoiceQuestionNodeProps {
  node: Node;
  attributes: object;
  isFocused: boolean;
  children: any;
  editor: Editor;
}

export class MultipleChoiceQuestionNode extends PureComponent<
  IMultipleChoiceQuestionNodeProps
> {
  public render() {
    const { node, attributes, children } = this.props;
    // @ts-ignore only invoked on section type blocks
    const isVisible = node.data.get("isVisible");
    return <div {...attributes}>{children}</div>;
  }
}
