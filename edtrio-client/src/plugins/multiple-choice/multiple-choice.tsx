import { List } from "immutable";
import React, { PureComponent } from "react";
import { Block, Editor, Node, Text } from "slate";

interface IMultipleChoiceNodeProps {
  node: Node;
  attributes: object;
  isFocused: boolean;
  children: any;
  editor: Editor;
  readOnly: boolean;
}

function addAnswer(event: any, editor: Editor, node: Node, index: number) {
  editor.insertNodeByPath(
    editor.value.document.getPath(node.key),
    index,
    Block.create({
      type: "multiple-choice-answer",
      nodes: List([Text.create({})]),
    }),
  );
}

export class MultipleChoiceNode extends PureComponent<
  IMultipleChoiceNodeProps
> {
  public render() {
    const { node, attributes, children, editor, readOnly } = this.props;
    return (
      <div {...attributes}>
        {children}
        {!readOnly && (
          <span contentEditable={false}>
            <button
              onMouseDown={event => {
                addAnswer(event, editor, node, children.length);
              }}
            >
              Antwort hinzufügen
            </button>
          </span>
        )}
      </div>
    );
  }
}
