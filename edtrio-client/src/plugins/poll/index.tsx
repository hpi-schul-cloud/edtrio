import React, { Fragment } from "react";
import { Editor, Node } from "slate";
import styled from "styled-components";
import { EditorStateContext } from "../../context/EditorStateContext";
import {
  PollStateContext,
} from "../../context/poll/PollStateContext";
import {
  PollStateProvider
} from "../../context/poll/PollStateProvider";
import PollAnswerNode from "./Answer";
import { cloneAndDBasifyPoll } from "./helpers/pollManipulation";
import { getEmptyTemplate } from "./helpers/templates";
import PollNode from "./Poll";
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

const onClickPollButton = async (event: any, editor: Editor) => {
  const placeholderUntilDB = getEmptyTemplate();
  editor.insertBlock(placeholderUntilDB);
  const dbasifiedTemplate = await cloneAndDBasifyPoll(placeholderUntilDB);
  editor.replaceNodeByKey(placeholderUntilDB.key, dbasifiedTemplate);
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
              <PollStateContext.Consumer>
                {({
                  votingAllowed,
                  displayResults,
                  initState,
                  selectedAnswer,
                  getUsersWhoHaveVoted,
                }) => (
                  <PollNode
                    node={node}
                    selected={isFocused}
                    editor={editor}
                    next={next}
                    readOnly={readOnly}
                    currentUser={currentUser}
                    votingAllowed={votingAllowed}
                    displayResults={displayResults}
                    selectedAnswer={selectedAnswer}
                    getUsersWhoHaveVoted={getUsersWhoHaveVoted}
                    initState={initState}
                    {...attributes}
                  >
                    {children}
                  </PollNode>
                )}
              </PollStateContext.Consumer>
            </PollStateProvider>
          )}
        </EditorStateContext.Consumer>
      );
    }
    if (node.type === "poll_question") {
      return (
        <EditorStateContext.Consumer>
          {({ currentUser }) => (
            <PollStateContext.Consumer>
              {({ getTotalVotes, getUsersWhoHaveVoted, displayResults }) => (
                <PollQuestionNode
                  parent={parent}
                  editor={editor}
                  readOnly={readOnly}
                  getTotalVotes={getTotalVotes}
                  currentUser={currentUser}
                  getUsersWhoHaveVoted={getUsersWhoHaveVoted}
                  displayResults={displayResults}
                  {...attributes}
                >
                  {children}
                </PollQuestionNode>
              )}
            </PollStateContext.Consumer>
          )}
        </EditorStateContext.Consumer>
      );
    }
    if (node.type === "poll_answer") {
      return (
        <EditorStateContext.Consumer>
          {({ currentUser }) => (
            <PollStateContext.Consumer>
              {({
                selectedAnswer,
                updateSelectedAnswer,
                displayResults,
                getAnswerInformation,
                getTotalVotes,
                getUsersWhoHaveVoted,
              }) => (
                <PollAnswerNode
                  node={node}
                  parent={parent}
                  editor={editor}
                  readOnly={readOnly}
                  currentUser={currentUser}
                  selectedAnswer={selectedAnswer}
                  updateSelectedAnswer={updateSelectedAnswer}
                  displayResults={displayResults}
                  getAnswerInformation={getAnswerInformation}
                  getTotalVotes={getTotalVotes}
                  getUsersWhoHaveVoted={getUsersWhoHaveVoted}
                  {...attributes}
                >
                  {children}
                </PollAnswerNode>
              )}
            </PollStateContext.Consumer>
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
