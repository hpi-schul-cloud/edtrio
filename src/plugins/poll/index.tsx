import React from "react";

import { List } from "immutable";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { Block, Text } from "slate";
import "./style.css";

export default function Poll() {
  return {
    changes: {
    },
    helpers: {},
    components: {
      PollNode,
    },
    plugins: [RenderPollNode, RenderPlaceholder],
  };
}

const onClickNewAnswerButton = (event, change, onChange, node) => {
  event.preventDefault();
  onChange(change.call(appendNewAnswer, node));
};

const appendNewAnswer = (change, node) => {
  const newAnswer = Block.create({
    type: "poll_answer",
    nodes: List([Text.create("")]),
  });
  const lastIndex = node.nodes.count();

  return change
    .insertNodeByKey(node.key, lastIndex, newAnswer)
    .moveToEndOfNode(newAnswer);
};

const onClickDeleteAnswerButton = (event, change, onChange, node) => {
  event.preventDefault();
  onChange(change.call(deleteNode, node));
};

const onClickDeleteQuestionButton = (event, change, onChange, node) => {
  event.preventDefault();
  onChange(change.call(deleteNode, node));
};

const deleteNode = (change, node) => {
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
            onClickDeleteQuestionButton(
              event,
              editor.value.change(),
              editor.props.onChange,
              node,
            )
          }
        >
          <i className="material-icons left">delete</i>
          Frage löschen
        </button>
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
      <div>
        <h2>{children}</h2>
      </div>
    </li>
  );
}

function PollAnswerNode(props) {
  const { children, node, editor, parentKey, ...attributes } = props;

  return (
    <li className="collection-item row" {...attributes}>
      <div className="col s11">
        <input type="radio" name={"answergroup" + parentKey} />
        <span>{children}</span>
      </div>
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
    return
  },
};

const RenderPlaceholder = {
  renderPlaceholder({ editor, node }) {
    if (node.object !== "block") { return; }
    if (!(node.type === "poll_question" || node.type === "poll_answer")) { return; }
    if (node.text !== "") { return; }

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
