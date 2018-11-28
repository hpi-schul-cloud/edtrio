import React from "react";

import { Text, Block } from "slate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

export default function Poll(options) {
  return {
    changes: {
      insertPoll,
    },
    helpers: {},
    components: {
      PollNode,
    },
    plugins: [RenderPollNode, RenderPlaceholder],
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
          nodes: [Text.create("")],
        }),
        Block.create({
          type: "poll_answer",
          nodes: [Text.create("")],
        }),
        Block.create({
          type: "poll_answer",
          nodes: [Text.create("")],
        }),
      ],
    }),
  );
}

const onClickNewAnswerButton = (event, change, onChange, node) => {
  event.preventDefault();
  onChange(change.call(appendNewAnswer, node));
};

const appendNewAnswer = (change, node) => {
  const newAnswer = Block.create({
    type: "poll_answer",
    nodes: [Text.create("Hier Antwortmöglichkeit eingeben...")],
  });
  const lastIndex = node.nodes.count();

  return change
    .insertNodeByKey(node.key, lastIndex, newAnswer)
    .moveToEndOfNode(newAnswer);
};

const onClickDeleteAnswerButton = (event, change, onChange, node) => {
  event.preventDefault();
  onChange(change.call(deleteAnswer, node));
};

const deleteAnswer = (change, node) => {
  return change.removeNodeByKey(node.key);
};

function PollNode(props) {
  const { children, node, editor, ...attributes } = props;

  return (
    <div>
      <ul className="collection with-header" {...attributes}>
        {children}
      </ul>
      <div className="right-align">
        <button
          className="btn-flat"
          onClick={event =>
            onClickNewAnswerButton(
              event,
              editor.value.change(),
              editor.props.onChange,
              node,
            )
          }
        >
          <i className="material-icons left">add</i>
          Antwort hinzufügen
        </button>
      </div>
    </div>
  );
}

function PollQuestionNode(props) {
  const { children, ...attributes } = props;
  return (
    <li className="collection-header" {...attributes}>
      <h2>{children}</h2>
    </li>
  );
}

function PollAnswerNode(props) {
  const { children, node, editor, parentKey, ...attributes } = props;

  return (
    <li className="collection-item row" {...attributes}>
      <label className="col s11">
        <input
          type="radio"
          name={"answergroup" + parentKey}
          className="with-gap"
        />
        <span>{children}</span>
      </label>
      <div className="col s1 right-align">
        <button
          className="btn-flat"
          onClick={event =>
            onClickDeleteAnswerButton(
              event,
              editor.value.change(),
              editor.props.onChange,
              node,
            )
          }
        >
          <i className="material-icons right">delete</i>
        </button>
      </div>
    </li>
  );
}

/**
 * Overwrites Slates Editor.renderNode(props) to actually render
 * ImageNode for `img` tags
 */
const RenderPollNode = {
  renderNode(props, next) {
    // append to parent, see add-section
    const { children, attributes, node, isFocused, editor, parent } = props;
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
      return (
        <PollAnswerNode
          node={node}
          parentKey={parent.key}
          editor={editor}
          {...attributes}
        >
          {children}
        </PollAnswerNode>
      );
    }
  },
};

const RenderPlaceholder = {
  renderPlaceholder({ editor, node }) {
    if (node.object !== "block") return;
    if (!(node.type === "poll_question" || node.type === "poll_answer")) return;
    if (node.text !== "") return;

    const placeholderText =
      node.type === "poll_question"
        ? "Hier Frage eingeben..."
        : "Hier Antwort eingeben...";
    return (
      <span
        contentEditable={false}
        style={{ display: "inline-block", width: "0", whiteSpace: "nowrap" }}
        className="has-text-grey-light"
        onMouseDown={e => {
          const change = editor.value.change();
          const onChange = editor.props.onChange;
          onChange(change.moveToEndOfNode(node).focus());
          return true;
        }}
      >
        {placeholderText}
      </span>
    );
  },
};
