import React, { ReactNode } from "react";
import "./style.css";

import { Editor, Node } from "slate";
import Controls from "./Controls";

export default function Section() {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [
      RenderSectionNode,
      RenderPNode,
      // ensureAlwaysMinOneSection,
      // ensureLastNodeInSectionIsP,
    ],
  };
}

// const schema = {
//   blocks: {
//     section: {
//       data: {
//         isVisible: (v: any) => typeof v === "boolean",
//       },
//       parent: { object: "document" },
//     },
//   },
// };

const RenderSectionNode = {
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
    if ("type" in node && node.type === "section") {
      const isVisible = node.data.get("isVisible");
      return (
        <section
          className={`section content ${!isVisible ? "hidden" : ""}`}
          {...attributes}
        >
          {children}
          {isFocused ? (
            <Controls editor={editor} isVisible={isVisible} />
          ) : null}
        </section>
      );
    }
    return next();
  },
};

const RenderPNode = {
  renderNode(
    {
      attributes,
      children,
      node,
    }: {
      attributes: object;
      children: ReactNode;
      node: Node;
    },
    editor: Editor,
    next: () => void,
  ) {
    if ("type" in node && node.type === "p") {
      return <p {...attributes}>{children}</p>;
    }
    return next();
  },
};

// TODO: what to do with this?
// const ensureAlwaysMinOneSection = {
//   normalizeNode(node: Node, editor: Editor) {
//     if (node.object !== "document") return;
//     const { nodes } = node;
//     if (nodes.size <= 0) return;
//     if (nodes.first().type !== "title") return;
//     if (nodes.last().type === "section") return;

//     const newSection = Block.create({
//       type: "section",
//       data: {
//         isVisible: true,
//       },
//       nodes: List([
//         Block.create({
//           type: "p",
//           nodes: List([Text.create({})]),
//         }),
//       ]),
//       key: "minSection",
//     });

//     return (editor: Editor) =>
//       editor.insertNodeByKey(node.key, nodes.count(), newSection);
//   },
// };

// const ensureLastNodeInSectionIsP = {
//   normalizeNode(node: Node, editor: Editor) {
//     if ("type" in node && node.type !== "section") {
//       const { nodes } = node;

//       const lastNode = nodes.last();
//       if (nodes.count() > 0 && "type" in lastNode && lastNode.type === "p")
//         return;

//       const newParagraph = Block.create({
//         type: "p",
//         nodes: List([Text.create({})]),
//       });
//       editor.insertNodeByKey(node.key, nodes.count(), newParagraph);
//     }

//     return;
//   },
// };
