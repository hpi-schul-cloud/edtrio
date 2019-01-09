import React from "react";
import "./style.css";

import Controls from "./Controls";

import { Block, Text } from "slate";

export default function Section(options) {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [
      RenderSectionNode,
      RenderPNode,
      { schema },
      ensureAlwaysMinOneSection,
      ensureLastNodeInSectionIsP,
    ],
  };
}

const schema = {
  blocks: {
    section: {
      data: {
        isVisible: v => typeof v === "boolean",
      },
      parent: { object: "document" },
    },
  },
};

const RenderSectionNode = {
  renderNode({ attributes, editor, children, node, isFocused }) {
    if (node.type === "section") {
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
  },
};

const RenderPNode = {
  renderNode({ attributes, children, node }) {
    if (node.type === "p") {
      return <p {...attributes}>{children}</p>;
    }
  },
};

const ensureAlwaysMinOneSection = {
  normalizeNode(node) {
    if (node.object !== "document") return;
    const { nodes } = node;
    if (nodes.size <= 0 || nodes.size >= 2) return;
    if (nodes.first().type !== "title") return;
    if (nodes.last().type === "section") return;

    const newSection = Block.create({
      type: "section",
      data: {
        isVisible: true,
      },
      nodes: [
        Block.create({
          type: "p",
          nodes: [Text.create()],
        }),
      ],
    });

    return change =>
      change.insertNodeByKey(node.key, nodes.count(), newSection);
  },
};

const ensureLastNodeInSectionIsP = {
  normalizeNode(node) {
    if (node.type !== "section") return;
    const { nodes } = node;
    if (nodes.count() > 0 && nodes.last().type === "p") return;

    const newParagraph = Block.create({
      type: "p",
      nodes: [Text.create()],
    });

    return change =>
      change.insertNodeByKey(node.key, nodes.count(), newParagraph);
  },
};
