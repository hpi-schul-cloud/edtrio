import React from "react";

import Hotkey from "../../helpers/Hotkey";

import "./style.css";

export default function Code(options) {
  return {
    changes: {},
    helpers: {
      toggleCodeBlock,
    },
    components: {
      CodeNode,
    },
    plugins: [
      Hotkey("Control+c", toggleCodeBlock),
      RenderCodeNode,
      HandleEnterKey,
      { schema },
    ],
  };
}

const schema = {
  blocks: {
    code: {
      marks: [],
    },
  },
};

function toggleCodeBlock(change) {
  const isCode = change.value.blocks.some(block => block.type === "code");
  change.setBlocks(isCode ? "p" : "code");
  return true;
}

function CodeNode(props) {
  return (
    <pre
      className={`code-block ${props.selected ? "selected" : ""}`}
      {...props.attributes}
    >
      <code>{props.children}</code>
    </pre>
  );
}

const HandleEnterKey = {
  onKeyDown(event, change) {
    if (change.value.startBlock.type !== "code") return;

    switch (event.key) {
      case "Enter":
        return change.insertText("\n");
      case "Tab":
        event.preventDefault();
        return change.insertText("  ");
      default:
      // pass
    }
  },
};

const RenderCodeNode = {
  renderNode(props) {
    return props.node.type === "code" ? (
      <CodeNode selected={props.isFocused} {...props} />
    ) : null;
  },
};
