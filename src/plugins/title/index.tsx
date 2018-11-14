import React, { Fragment } from "react";
import styled from "styled-components";
import { Editor } from "slate";
// @ts-ignore
import SlateReactPlaceholder from "slate-react-placeholder";

import { LastSavedContext } from "../../context/lastSavedContext";
import SaveBar from "./SaveBar";

export default function Title() {
  return {
    plugins: [
      HandleKeyDown,
      RenderTitleNode,
      SlateReactPlaceholder({
        placeholder: "Gib mir einen Namen",
        when: (editor: Editor) => editor.value.startText.text === "",
      }),
    ],
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

const RenderTitleNode = {
  renderNode(props: any) {
    const { attributes, children, editor, node } = props;

    return node.type === "title" ? (
      <Fragment>
        <StyledTitleBar {...attributes}>{children}</StyledTitleBar>
        <LastSavedContext.Consumer>
          {({ lastSaved }) => <SaveBar editor={editor} lastSaved={lastSaved} />}
        </LastSavedContext.Consumer>
      </Fragment>
    ) : null;
  },
};
