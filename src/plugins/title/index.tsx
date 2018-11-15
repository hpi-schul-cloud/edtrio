import React, { Fragment } from "react";
import { Editor, Node } from "slate";
import styled from "styled-components";

// @ts-ignore
import SlateReactPlaceholder from "slate-react-placeholder";

import { LastSavedContext } from "../../context/lastSavedContext";
import SaveBar from "./SaveBar";

export default function Title() {
  return {
    plugins: [HandleKeyDown, RenderTitleNode],
  };
}

const HandleKeyDown = {
  // On Enter, move focus to next Editor Block
  onKeyDown(event: any, editor: Editor, next: any) {
    if (event.key === "Enter") {
      if (editor.value.startBlock.type !== "title") {
        return next();
      }
      event.preventDefault();
      editor.moveToEndOfNode(editor.value.nextBlock);
      return true;
    }
    return next();
  },
};

const StyledTitleBar = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
  word-break: break-word;
`;

const StyledPlaceholder = styled.span`
  pointer-events: none;
  display: inline-block;
  width: 0;
  maxwidth: 100%;
  white-space: nowrap;
  opacity: 0.333;
`;

const RenderTitleNode = {
  renderNode(props: any, editor: Editor, next: () => void) {
    const { attributes, children, node } = props;
    return node.type === "title" ? (
      <Fragment>
        <StyledTitleBar {...attributes}>{children}</StyledTitleBar>
        <LastSavedContext.Consumer>
          {({ lastSaved }) => <SaveBar editor={editor} lastSaved={lastSaved} />}
        </LastSavedContext.Consumer>
      </Fragment>
    ) : (
      next()
    );
  },
  decorateNode(node: Node, editor: Editor, next: () => void) {
    if (!("type" in node)) { return next(); }
    if (node.type !== "title") { return next(); }
    if (node.text !== "") { return next(); }

    const others = next();
    const first = node.getFirstText();
    const last = node.getLastText();
    if (!first || !last) { return next(); }
    const decoration = {
      anchor: { key: first.key, offset: 0 },
      focus: { key: last.key, offset: last.text.length },
      mark: {
        type: "placeholder",
        data: { placeholder: "Gib mir einen Namen" },
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
