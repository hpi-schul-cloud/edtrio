import React, { Fragment, ReactNode } from "react";
// @ts-ignore
import SlateReactPlaceholder from "slate-react-placeholder";
import styled from "styled-components";

import { Editor, Node } from "slate";
import { MultipleChoiceNode } from "./multiple-choice";
import { MultipleChoiceAnswerNode } from "./multiple-choice-answer";
import { MultipleChoiceQuestionNode } from "./multiple-choice-question";

const StyledPlaceholder = styled.span`
  pointer-events: none;
  display: inline-block;
  width: 0;
  maxwidth: 100%;
  white-space: nowrap;
  opacity: 0.333;
`;

export default function MultipleChoice() {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [
      RenderMultipleChoiceNode,
      RenderMultipleChoiceAnswerNode,
      RenderMultipleChoiceQuestionNode,
    ],
  };
}

const RenderMultipleChoiceNode = {
  renderNode(
    {
      attributes,
      children,
      node,
      isFocused,
    }: {
      attributes: object;
      children: ReactNode;
      node: Node;
      isFocused: boolean;
    },
    editor: Editor,
    next: () => void,
  ) {
    if ("type" in node && node.type === "multiple-choice") {
      return (
        <MultipleChoiceNode
          node={node}
          attributes={attributes}
          editor={editor}
          isFocused={isFocused}
        >
          {children}
        </MultipleChoiceNode>
      );
    }
    return next();
  },
};

const RenderMultipleChoiceQuestionNode = {
  renderNode(
    {
      attributes,
      children,
      node,
      isFocused,
    }: {
      attributes: object;
      children: ReactNode;
      node: Node;
      isFocused: boolean;
    },
    editor: Editor,
    next: () => void,
  ) {
    if ("type" in node && node.type === "multiple-choice-question") {
      return (
        <MultipleChoiceQuestionNode
          node={node}
          attributes={attributes}
          editor={editor}
          isFocused={isFocused}
        >
          {children}
        </MultipleChoiceQuestionNode>
      );
    }
    return next();
  },
  decorateNode(node: Node, editor: Editor, next: () => void) {
    if (!("type" in node)) {
      return next();
    }
    if (node.type !== "multiple-choice-question") {
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
        data: { placeholder: "Schreib deine Frage hier" },
      },
    };

    // @ts-ignore
    return [...others, decoration];
  },
};

const RenderMultipleChoiceAnswerNode = {
  renderNode(
    {
      attributes,
      children,
      node,
      isFocused,
    }: {
      attributes: object;
      children: ReactNode;
      node: Node;
      isFocused: boolean;
    },
    editor: Editor,
    next: () => void,
  ) {
    if ("type" in node && node.type === "multiple-choice-answer") {
      return (
        <MultipleChoiceAnswerNode
          node={node}
          attributes={attributes}
          editor={editor}
          isFocused={isFocused}
        >
          {children}
        </MultipleChoiceAnswerNode>
      );
    }
    return next();
  },
  decorateNode(node: Node, editor: Editor, next: () => void) {
    if (!("type" in node)) {
      return next();
    }
    if (node.type !== "multiple-choice-answer") {
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
        data: { placeholder: "Schreib deine Antwort hier" },
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
