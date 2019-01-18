import React, { PureComponent } from "react";
import { Block, Editor } from "slate";

import { EditorStateContext } from "../../../context/EditorStateContext";

import { MultipleChoiceAnswerPupilNode } from "./multiple-choice-answer-pupil";
import { MultipleChoiceAnswerTeacherNode } from "./multiple-choice-answer-teacher";

export interface IMultipleChoiceAnswerNodeProps {
  node: Block;
  attributes: object;
  isFocused: boolean;
  children: any;
  editor: Editor;
  readOnly: boolean;
}

export class MultipleChoiceAnswerNode extends PureComponent<
  IMultipleChoiceAnswerNodeProps
> {
  public render() {
    const { readOnly } = this.props;
    if (readOnly) {
      return (
        <EditorStateContext.Consumer>
          {({ currentUser }) => {
            return (
              <MultipleChoiceAnswerPupilNode
                currentUser={currentUser}
                {...this.props}
              />
            );
          }}
        </EditorStateContext.Consumer>
      );
    } else {
      return <MultipleChoiceAnswerTeacherNode {...this.props} />;
    }
  }
}
