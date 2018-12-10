import { List } from "immutable";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import React, { Fragment } from "react";
import { Editor, Node } from "slate";
import { Block, Text } from "slate";
import styled from "styled-components";
import PollAnswerNode from "./Answer";
import PollQuestionNode from "./Question";
import "./style.css";

export default function Poll() {
  return {
    changes: {},
    helpers: {},
    components: {
      PollNode,
    },
    plugins: [RenderPollNode],
  };
}

// TODO: Node should be used instead of any for 'node'
const onClickNewAnswerButton = (event: any, editor: Editor, node: any) => {
  event.preventDefault();
  appendNewAnswer(editor, node);
};

const appendNewAnswer = (editor: Editor, node: any) => {
  const newAnswer = Block.create({
    type: "poll_answer",
    nodes: List([Text.create("")]),
  });
  const lastIndex = node.nodes.size;

  return editor
    .insertNodeByKey(node.key, lastIndex, newAnswer)
    .moveToEndOfNode(newAnswer);
};

const answerButton = (editor: Editor, node: any, readOnly: boolean) => {
  return readOnly ? (
    <button
      className="btn-flat"
      onClick={event => onClickNewAnswerButton(event, editor, node)}
    >
      <i className="material-icons left">send</i>
      Antworten
    </button>
  ) : (
    <button
      className="btn-flat"
      onClick={event => onClickNewAnswerButton(event, editor, node)}
    >
      <i className="material-icons left">add</i>
      Antwort hinzufügen
    </button>
  );
};

function PollNode(props: any) {
  const { children, node, editor, readOnly, ...attributes } = props;

  return (
    <div>
      <ul className="collection with-header" {...attributes}>
        {children}
      </ul>
      <div className="right-align">{answerButton(editor, node, readOnly)}</div>
    </div>
  );
}

const StyledPlaceholder = styled.span`
  pointer-events: none;
  display: inline-block;
  width: 0;
  maxwidth: 100%;
  white-space: nowrap;
  opacity: 0.333;
`;

const RenderPollNode = {
  renderNode(props: any, next: any) {
    // append to parent, see add-section
    const {
      children,
      attributes,
      node,
      isFocused,
      editor,
      parent,
      readOnly,
    } = props;

    if (node.type === "poll") {
      return (
        <PollNode
          node={node}
          selected={isFocused}
          editor={editor}
          {...attributes}
          next={next}
          readOnly={readOnly}
        >
          {children}
        </PollNode>
      );
    }
    if (node.type === "poll_question") {
      return (
        <PollQuestionNode parent={parent} editor={editor} {...attributes}>
          {children}
        </PollQuestionNode>
      );
    }
    if (node.type === "poll_answer") {
      return (
        <PollAnswerNode
          node={node}
          parentKey={parent.key}
          editor={editor}
          readOnly={readOnly}
          {...attributes}
        >
          {children}
        </PollAnswerNode>
      );
    }
    return;
  },

  decorateNode(node: Node, editor: Editor, next: () => void) {
    if (!("type" in node)) {
      return next();
    }
    if (node.type !== "poll_answer" && node.type !== "poll_question") {
      return next();
    }
    if (node.text !== "") {
      return next();
    }

    const first = node.getFirstText();
    const last = node.getLastText();
    if (!first || !last) {
      return next();
    }
    const others = next();

    const decoration = {
      anchor: { key: first.key, offset: 0 },
      focus: { key: last.key, offset: last.text.length },
      mark: {
        type: "placeholder",
        data: { placeholder: "Text eingeben..." },
      },
    };

    // @ts-ignore
    return [...others, decoration];
  },
  renderMark(props: any, editor: Editor, next: () => void) {
    const { children, mark } = props;

    if (mark.type === "placeholder") {
      const content = mark.data.get("placeholder");

      return (
        <Fragment>
          <StyledPlaceholder contentEditable={false}>
            {content}
          </StyledPlaceholder>
          {children}
        </Fragment>
      );
    }

    return next();
  },
};
