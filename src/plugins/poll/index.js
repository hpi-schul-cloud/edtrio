import React from "react";

import { Text, Block } from "slate";

export default function Poll(options) {
  return {
    changes: {
      insertPoll,
    },
    helpers: {},
    components: {
      PollNode,
    },
    plugins: [RenderPollNode],
  };
}

/**
 * Change that inserts an image block displaying the src image
 */
function insertPoll(change, target) {
  if (target) {
    change.select(target);
  }

  change.insertBlock(
    Block.create({
      type: "poll",
      nodes: [
        Block.create({
          type: "poll_question",
          nodes: [Text.create("Test Question")],
        }),
        Block.create({
          type: "poll_answer",
          nodes: [Text.create("Test Answer")],
        }),
      ],
    }),
  );
}

/**
 * React Component that displays an actual image from props.src url
 */
function PollNode(props) {
  const { children, ...attributes } = props;

  return (
    <div>
      <h1 className="title is-1" {...attributes}>
        {children}
      </h1>
      <button>Test</button>
    </div>
  );
}

/**
 * Overwrites Slates Editor.renderNode(props) to actually render
 * ImageNode for `img` tags
 */
const RenderPollNode = {
  renderNode(props, next) {
    // append to parent, see add-section
    const { children, attributes, node, isFocused } = props;
    // console.log(props);
    if (node.type === "poll") {
      return (
        <PollNode selected={isFocused} {...attributes} next={next}>
          {children}
        </PollNode>
      );
    }
    if (node.type === "poll_question") {
      return (
        <div style={{ color: "red" }} {...attributes}>
          {children}
        </div>
      );
    }
  },
};
