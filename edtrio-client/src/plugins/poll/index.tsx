import { List } from "immutable";
import React, { Fragment } from "react";
import { Block, Editor, Node, Text } from "slate";
import styled from "styled-components";
import { EditorStateContext } from "../../context/EditorStateContext";
import { PollStateProvider } from "../../context/PollStateContext";
import { PollStateContext } from "../../context/PollStateContext";
import { apolloClient } from "../../EditorWrapper/apolloClient";
import {
  createPoll,
  createPollVariables,
} from "../../graphqlOperations/generated-types/createPoll";
import {
  createPollAnswer,
  createPollAnswerVariables,
} from "../../graphqlOperations/generated-types/createPollAnswer";
import {
  CREATE_POLL,
  CREATE_POLL_ANSWER,
} from "../../graphqlOperations/operations";
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

const onClickPollButton = async (event: any, editor: Editor) => {
  event.preventDefault();
  const poll = await apolloClient.mutate<createPoll, createPollVariables>({
    mutation: CREATE_POLL,
    variables: { votingAllowed: false, displayResults: false },
  });
  // @ts-ignore: I just created it.......... amk
  const pollid = poll.data.createPoll.id;

  editor.insertBlock(
    Block.create({
      type: "poll",
      data: { id: pollid },
      nodes: List([
        Block.create({ type: "poll_question" }),
        await createNewPollAnswer(pollid),
        await createNewPollAnswer(pollid),
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
                  updateDisplayResults,
                  updateVotingAllowed,
                  updateId,
                  selectedAnswer,
                  getUsersWhoHaveVoted: getUsersWhoHaveVoted,
                }) => (
                  <PollNode
                    node={node}
                    selected={isFocused}
                    editor={editor}
                    next={next}
                    readOnly={readOnly}
                    currentUser={currentUser}
                    votingAllowed={votingAllowed}
                    selectedAnswer={selectedAnswer}
                    getUsersWhoHaveVoted={getUsersWhoHaveVoted}
                    updateVotingAllowed={updateVotingAllowed}
                    updateDisplayResults={updateDisplayResults}
                    updateId={updateId}
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
            <PollStateContext.Consumer>
              {({ selectedAnswer, updateSelectedAnswer, displayResults }) => (
                <PollAnswerNode
                  node={node}
                  parent={parent}
                  editor={editor}
                  readOnly={readOnly}
                  currentUser={currentUser}
                  selectedAnswer={selectedAnswer}
                  updateSelectedAnswer={updateSelectedAnswer}
                  displayResults={displayResults}
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
