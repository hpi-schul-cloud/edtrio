import React from "react";
import { Editor } from "slate";

// import Hotkey from "../../helpers/Hotkey";

import "./style.css";

export default function Code() {
  return {
    plugins: [
      // Hotkey("Control+c", toggleCodeBlock),
      RenderCodeNode,
      // HandleEnterKey,
    ],
  };
}

// function toggleCodeBlock(editor: Editor) {
//   const isCode = editor.value.blocks.some((block: Block | undefined) =>
//     block ? block.type === "code" : false,
//   );
//   editor.setBlocks(isCode ? "p" : "code");
//   return true;
// }

function CodeNode(props: any) {
  return (
    <pre
      className={`code-block ${props.selected ? "selected" : ""}`}
      {...props.attributes}
    >
      <code>{props.children}</code>
    </pre>
  );
}

// const HandleEnterKey = {
//   onKeyDown(event: any, editor: Editor, next: () => void) {
//     if (!editor.value.startBlock || editor.value.startBlock.type !== "code") {
//       return next();
//     }

//     switch (event.key) {
//       case "Enter":
//         return editor.insertText("\n");
//       case "Tab":
//         event.preventDefault();
//         return editor.insertText("  ");
//       default:
//         // pass
//         return next();
//     }
//   },
// };

const RenderCodeNode = {
  renderNode(props: any, editor: Editor, next: () => void) {
    return props.node.type === "code" ? (
      <CodeNode selected={props.isFocused} {...props} />
    ) : (
      next()
    );
  },
};
