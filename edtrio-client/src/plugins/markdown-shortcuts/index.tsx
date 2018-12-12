import React from "react";
import { Editor } from "slate";

// Taken and adapted from https://github.com/ianstormtaylor/slate/blob/master/examples/markdown-shortcuts/index.js

export default function MarkdownShortcuts() {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [RenderMoreTextBlocks, HandleKeyDown],
  };
}

const HandleKeyDown = {
  onKeyDown(event: any, editor: Editor, next: any) {
    switch (event.key) {
      case " ":
        return onSpace(event, editor, next);
      case "Backspace":
        return onBackspace(event, editor, next);
      case "Enter":
        return onEnter(event, editor, next);
      default:
    }
    return next();
  },
};

/**
 * On space, if it was after an auto-markdown shortcut,
 * convert the current node into the shortcut's
 * corresponding type.
 *
 * @param {Event} event
 * @param {Editor} editor
 */
const onSpace = (event: any, editor: Editor, next: () => void) => {
  const { value } = editor;
  const { selection } = value;
  if (selection.isExpanded) {
    return next();
  }

  const { startBlock } = value;
  const { start } = selection;
  const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, "");
  const type = _getType(chars);

  if (!type) {
    return next();
  }
  if (type === "li" && startBlock.type === "li") {
    return next();
  }
  event.preventDefault();

  editor.setBlocks(type);

  if (type === "li") {
    editor.wrapBlock("ul");
  }
  editor.deleteBackward(chars.length);
  editor.insertText(" ");
  editor.moveFocusToStartOfNode(startBlock);
  return true;
};

/**
 * On backspace, if at the start of a non-paragraph,
 * convert it back into a paragraph node.
 *
 * @param {Event} event
 * @param {Editor} editor
 */

const onBackspace = (event: any, editor: Editor, next: () => void) => {
  const { value } = editor;
  const { selection } = value;
  if (selection.isExpanded) {
    return next();
  }
  if (selection.start.offset !== 0) {
    return next();
  }

  const { startBlock } = value;
  if (startBlock.type === "p") {
    return next();
  }

  event.preventDefault();
  editor.setBlocks("p");

  if (startBlock.type === "li") {
    editor.unwrapBlock("ul");
  }

  return true;
};

/**
 * On return, if at the end of a node type that
 * should not be extended, create a new paragraph
 * below it.
 *
 * @param {Event} event
 * @param {Editor} editor
 */

const onEnter = (event: any, editor: Editor, next: () => void) => {
  const { value } = editor;
  const { selection } = value;
  const { start, end, isExpanded } = selection;
  if (isExpanded) {
    return next();
  }

  const { startBlock } = value;
  if (start.offset === 0 && startBlock.text.length === 0) {
    return onBackspace(event, editor, next);
  }
  if (end.offset !== startBlock.text.length) {
    return next();
  }

  if (
    startBlock.type !== "h1" &&
    startBlock.type !== "h2" &&
    startBlock.type !== "h3" &&
    startBlock.type !== "h4" &&
    startBlock.type !== "h5" &&
    startBlock.type !== "blockquote"
  ) {
    return next();
  }

  event.preventDefault();
  editor.splitBlock(1).setBlocks("p");
  return true;
};

/**
 * Get the block type for a series of auto-markdown shortcut `chars`.
 *
 * @param {String} chars
 * @return {String} block
 */

const _getType = (chars: string) => {
  switch (chars) {
    case "*":
    case "-":
    case "+":
      return "li";
    case ">":
      return "blockquote";
    case "#":
      return "h1";
    case "##":
      return "h2";
    case "###":
      return "h3";
    case "####":
      return "h4";
    case "#####":
      return "h5";
    default:
      return null;
  }
};

const RenderMoreTextBlocks = {
  renderNode(props: any, editor: Editor, next: any) {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "blockquote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "ul":
        return <ul {...attributes}>{children}</ul>;
      case "li":
        return <li {...attributes}>{children}</li>;
      default:
        return next();
    }
  },
};
