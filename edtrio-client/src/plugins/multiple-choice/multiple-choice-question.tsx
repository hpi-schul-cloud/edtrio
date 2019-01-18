import React, { PureComponent } from "react";
import styled from "styled-components";

import { Editor, Node } from "slate";

interface IMultipleChoiceQuestionNodeProps {
  node: Node;
  attributes: object;
  isFocused: boolean;
  children: any;
  editor: Editor;
  readOnly: boolean;
}

const StyledQuestion = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  margin: 8px;
`;

export class MultipleChoiceQuestionNode extends PureComponent<
  IMultipleChoiceQuestionNodeProps
> {
  public render() {
    const { attributes, children } = this.props;

    return (
      <StyledQuestion {...attributes}>
        <strong>{children}</strong>
      </StyledQuestion>
    );
  }
}
