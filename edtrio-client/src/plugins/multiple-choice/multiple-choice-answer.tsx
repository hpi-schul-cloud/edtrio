import React, { PureComponent } from "react";
import { Editor, Node } from "slate";
import uuid from "uuid/v4";

import styled from "styled-components";

const StyledCheckboxWrapper = styled.span`
  margin-right: 8px;
`;

interface IMultipleChoiceAnswerNodeProps {
  node: Node;
  attributes: object;
  isFocused: boolean;
  children: any;
  editor: Editor;
}

export class MultipleChoiceAnswerNode extends PureComponent<
  IMultipleChoiceAnswerNodeProps
> {
  public testValidity(props: IMultipleChoiceAnswerNodeProps) {
    // @ts-ignore
    const collisionNode = props.editor.value.document.findDescendant(
      (descendant: Node) =>
        "data" in descendant &&
        // @ts-ignore
        descendant.data.get("id") === props.node.data.get("id") &&
        descendant.key !== props.node.key,
    );
    if (collisionNode) {
      // node has been copied :O
      const newUUID = uuid();
      props.editor.setNodeByKey(props.node.key, {
        data: { id: newUUID },
        type: "multiple-choice-answer",
      });
    }
  }
  public componentDidMount() {
    setTimeout(() => this.testValidity(this.props), 200);
  }
  public render() {
    const { node, attributes, children } = this.props;
    // @ts-ignore only invoked on section type blocks
    const id = node.data.get("id");
    return (
      <div {...attributes}>
        <StyledCheckboxWrapper contentEditable={false}>
          <input type="checkbox" />
        </StyledCheckboxWrapper>
        {children}
      </div>
    );
  }

  public componentWillUnmount() {
    if (
      // @ts-ignore: this exists
      !this.props.editor.value.document.findDescendant(
        (node: Node) => node.key === this.props.node.key,
      )
    ) {
      // node has been deleted :O
    }
  }
}
