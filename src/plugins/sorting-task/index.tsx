import React from "react";
import { Editor } from "slate";

import { List } from "immutable";
import { Block, Text } from "slate";

export default function Poll() {
  return {
    changes: {
    },
    helpers: {},
    components: {
      SortingTaskNode
    },
  plugins: [RenderSortingTaskNode/*, RenderPlaceholder */],
  };
}

const onClickNewQuestionButton = (event, change, onChange, node) => {
  event.preventDefault();
  onChange(change.call(appendNewAnswer, node));
};

const appendNewAnswer = (change, node) => {
  const newTerm = Block.create({
    type: "sorting-task_term",
    nodes: List([Text.create("")]),
  });
  const newQuestion = Block.create({
    type: "sorting-task_solution",
    nodes: List([Text.create("")]),
  });

  const newAnswer = Block.create({
    type: "sorting-task_question",
    nodes: List([
      newTerm,
      newQuestion,
    ]),
  });

  const lastIndex = node.nodes.count();

  return change
    .insertNodeByKey(node.key, lastIndex, newAnswer)
    .moveToEndOfNode(newTerm);
};

function SortingTaskNode(props) {
  const { children, node, editor, ...attributes } = props;

  return (
    <div>
      <b>Sortieraufgabe</b>
      <table {...attributes}>
        <tr>
          <td>Begriff</td>
          <td>Musterlösung</td>
        </tr>
        {children}
      </table>
      <div className="right-align">
        <button
          className="btn-flat"
          onClick={event =>
            editor.change(change => {
              onClickNewQuestionButton(
                event,
                change,
                editor.props.onChange,
                node,
              )
            })
          }
        >
          <i className="material-icons left">add</i>
          Frage hinzufügen
        </button>
      </div>
    </div>
  );
}

function SortingTaskQuestionNode(props) {
  const { children, ...attributes } = props;
  return (
    <tr {...attributes}>
      {children}
    </tr>
  );
}

function SortingTaskQuestionTermNode(props) {
  const { children, ...attributes } = props;
  return (
    <td {...attributes}>
      {children}
    </td>
  );
}

function SortingTaskQuestionSolutionNode(props) {
  const { children, ...attributes } = props;
  return (
    <td {...attributes}>
      {children}
    </td>
  );
}

const RenderSortingTaskNode = {
  renderNode(props: any, editor: Editor, next: () => void) {
    // append to parent, see add-section
    const { children, attributes, node, isFocused
      , parent } = props;
    // console.log(props);
    if (node.type === "sorting-task") {
      return (
        <SortingTaskNode
          node={node}
          selected={isFocused}
          editor={editor}
          {...attributes}
          next={next}
        >
          {children}
        </SortingTaskNode>
      );
    }
    if (node.type === "sorting-task_question") {
      return (
        <SortingTaskQuestionNode
          node={node}
          selected={isFocused}
          editor={editor}
          {...attributes}
          next={next}
        >
          {children}
        </SortingTaskQuestionNode>
      );
    }
    if (node.type === "sorting-task_term") {
      return (
        <SortingTaskQuestionTermNode
          node={node}
          parentKey={parent.key}
          editor={editor}
          {...attributes}
        >
          {children}
        </SortingTaskQuestionTermNode>
      );
    }
    if (node.type === "sorting-task_solution") {
      return (
        <SortingTaskQuestionSolutionNode
          node={node}
          parentKey={parent.key}
          editor={editor}
          {...attributes}
        >
          {children}
        </SortingTaskQuestionSolutionNode>
      );
    }
    return next();
  },
};