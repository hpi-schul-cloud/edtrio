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

const onClickNewAnswerButton = (event, change, onChange, node) => {
  event.preventDefault();
  change.call(appendNewAnswer, node);
  onChange(change);
};

const appendNewAnswer = (change, node) => {
  const newAnswer = Block.create({
    type: "poll_answer",
    nodes: [Text.create("ABC")],
  });
  const lastIndex = node.nodes.count();

  return change
    .insertNodeByKey(node.key, lastIndex, newAnswer)
    .moveToEndOfNode(newAnswer);
};

function PollNode(props) {
  const { children, node, editor, ...attributes } = props;

  return (
    <div>
      <div {...attributes}>{children}</div>
      <button
        onClick={event =>
          onClickNewAnswerButton(
            event,
            editor.value.change(),
            editor.props.onChange,
            node,
          )
        }
      >
        Test
      </button>
    </div>
  );
}

function PollQuestionNode(props) {
  const { children, ...attributes } = props;
  return (
    <div {...attributes}>
      <h2>{children}</h2>
    </div>
  );
}

function PollAnswerNode(props) {
  const { children, ...attributes } = props;

  return (
    <div {...attributes}>
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

/**
 * Overwrites Slates Editor.renderNode(props) to actually render
 * ImageNode for `img` tags
 */
const RenderPollNode = {
  renderNode(props, next) {
    // append to parent, see add-section
    const { children, attributes, node, isFocused, editor } = props;
    // console.log(props);
    if (node.type === "poll") {
      return (
        <PollNode
          node={node}
          selected={isFocused}
          editor={editor}
          {...attributes}
          next={next}
        >
          {children}
        </PollNode>
      );
    }
    if (node.type === "poll_question") {
      return <PollQuestionNode {...attributes}>{children}</PollQuestionNode>;
    }
    if (node.type === "poll_answer") {
      return <PollAnswerNode {...attributes}>{children}</PollAnswerNode>;
    }
  },
};
