import { List } from "immutable";
import React, { PureComponent } from "react";
import { Block, Editor, Node, Text } from "slate";
import uuid from "uuid/v4";

interface IMultipleChoiceNodeProps {
  node: Node;
  attributes: object;
  isFocused: boolean;
  children: any;
  editor: Editor;
}

function addAnswer(event: any, editor: Editor, node: Node, index: number) {
  console.log(uuid());
  editor.insertNodeByPath(
    editor.value.document.getPath(node.key),
    index,
    Block.create({
      type: "multiple-choice-answer",
      nodes: List([Text.create({})]),
      data: { id: uuid() },
    }),
  );
}

export class MultipleChoiceNode extends PureComponent<
  IMultipleChoiceNodeProps
> {
  public render() {
    const { node, attributes, children, editor } = this.props;
    return (
      <div {...attributes}>
        {children}
        <span contentEditable={false}>
          <button
            onMouseDown={event => {
              addAnswer(event, editor, node, children.length);
            }}
          >
            Antwort hinzufügen
          </button>
        </span>
      </div>
    );
  }
}
