import { List } from "immutable";
import React, { Fragment } from "react";
import { Block, Editor, Node, Text } from "slate";
import styled from "styled-components";
import { EditorStateContext } from "../../context/EditorStateContext";
import { PollStateProvider } from "../../context/PollStateContext";
import PollAnswerNode from "./Answer";
import PollNode, { createNewPollAnswer } from "./Poll";
import PollQuestionNode from "./Question";
import "./style.css";

export default function Poll() {
  return {
    changes: { onClickPollButton },
    helpers: {},
    components: {
      PollNode,
    },
    plugins: [RenderPollNode],
  };
}

const onClickPollButton = (event: any, editor: Editor) => {
  event.preventDefault();

  editor.insertBlock(
    Block.create({
      type: "poll",
      nodes: List([
        Block.create({
          type: "poll_question",
          nodes: List([Text.create("")]),
        }),
        createNewPollAnswer(),
        createNewPollAnswer(),
      ]),
    }),
  );
};

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
    // TODO: Get current user from props

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
        <EditorStateContext.Consumer>
          {({ currentUser }) => (
            <PollStateProvider>
              <PollNode
                node={node}
                selected={isFocused}
                editor={editor}
                next={next}
                readOnly={readOnly}
                currentUser={currentUser}
                {...attributes}
              >
                {children}
              </PollNode>
            </PollStateProvider>
          )}
        </EditorStateContext.Consumer>
      );
    }
    if (node.type === "poll_question") {
      return (
        <PollQuestionNode
          parent={parent}
          editor={editor}
          readOnly={readOnly}
          {...attributes}
        >
          {children}
        </PollQuestionNode>
      );
    }
    if (node.type === "poll_answer") {
      return (
        <EditorStateContext.Consumer>
          {({ currentUser }) => (
            <PollAnswerNode
              node={node}
              parent={parent}
              editor={editor}
              readOnly={readOnly}
              currentUser={currentUser}
              {...attributes}
            >
              {children}
            </PollAnswerNode>
          )}
        </EditorStateContext.Consumer>
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
    function getPlaceholderTextByNodeType(type: string) {
      if (type === "poll_answer") {
        return "Hier eine Antwort eingeben...";
      }
      if (type === "poll_question") {
        return "Hier Frage eingeben...";
      }
      return "Hier Text eingeben...";
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
        data: { placeholder: getPlaceholderTextByNodeType(node.type) },
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
