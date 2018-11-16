import React from "react";

import { Text, Block } from "slate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

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
        Block.create({
          type: "poll_answer",
          nodes: [Text.create("Test Answer 2")],
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
      <div className="title is-1" {...attributes}>
        {children}
      </div>
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
          <h2>{children}</h2>
        </div>
      );
    }
    if (node.type === "poll_answer") {
      return (
        <div style={{ color: "red" }} {...attributes}>
          <span>{children}</span>
          <span className="align-right">
            <button>
              <span className="icon is-small">
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
            </button>
          </span>
        </div>
      );
    }
  },
};
