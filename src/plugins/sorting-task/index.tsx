import React from "react";
import { Editor } from "slate";

import { List } from "immutable";
import { Block, Text } from "slate";
import "./styles.css";

export default function Poll() {
  return {
    changes: {
    },
    helpers: {},
    components: {
      SortingTaskNode
    },
  plugins: [RenderSortingTaskNode],
  };
}

const onClickNewQuestionButton = (event, editor, node) => {
  event.preventDefault();
  editor.command(appendNewAnswer, node)
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

const onClickNextQuestionButton = (event, editor, node) => {
  event.preventDefault();
  const prevValue = node.data.get("viewItem") || 0;
  editor.setNodeByKey(node.key, { data: { viewItem: prevValue + 1 } })
};

const onClickResetQuizButton = (event, editor, node) => {
  event.preventDefault();
  editor.setNodeByKey(node.key, { data: { viewItem: 0 } })
  node.nodes.forEach(childNode => {
    editor.setNodeByKey(childNode.key, { data: { viewState: false } })
  });
};

const onClickToggleQuestionButton = (event, editor, node) => {
  event.preventDefault();
  const currentState = node.data.get("viewState") || false;
  editor.setNodeByKey(node.key, { data: { viewState: !currentState } })
};

function SortingTaskNode(props) {
  const { children, node, editor, readOnly, ...attributes} = props;
  const currentChild = children[node.data.get("viewItem") || 0];
  return (readOnly ?
    (
      <div>
        <b>Sortieraufgabe (Schüleransicht)</b>
        {currentChild}
        <button
          type="button"
          onClick={event => {
              onClickNextQuestionButton(
                event,
                editor,
                node,
              )
            }
          }
        >
          Weiter
        </button>
        <button
          type="button"
          onClick={event => {
              onClickResetQuizButton(
                event,
                editor,
                node,
              )
            }
          }
        >
          Reset
        </button>
      </div>
    ) : (
      <div>
        <b>Sortieraufgabe (Lehreransicht)</b>
        <table {...attributes}>
          <tr>
            <th>Begriff</th>
            <th>Musterlösung</th>
          </tr>
          {children}
        </table>
        <div className="right-align">
          <button
            className="btn-flat"
            onClick={event => {
                onClickNewQuestionButton(
                  event,
                  editor,
                  node,
                )
              }
            }
          >
            <i className="material-icons left">add</i>
            Frage hinzufügen
          </button>
        </div>
      </div>
    )
  );
}

function SortingTaskQuestionNode(props) {
  const { children, node, editor, readOnly, ...attributes } = props;
  const currentChild = children[node.data.get("viewState")?1:0];
  return (readOnly ?
    (
      <div class="question-card"
        onClick={event =>
          editor.change(change => {
            onClickToggleQuestionButton(
              event,
              editor,
              node,
            )
          })
        }
        {...attributes}
      >
        {currentChild}
      </div>
    ) : (
      <tr {...attributes}>
        {children}
      </tr>
    )
  );
}

function SortingTaskQuestionTermNode(props) {
  const { children, readOnly, ...attributes } = props;
  return (readOnly ?
    (
      <p {...attributes}>
        Frage: {children}
      </p>
    ) : (
      <td {...attributes}>
        {children}
      </td>
    )
  );
}

function SortingTaskQuestionSolutionNode(props) {
  const { children, readOnly, ...attributes } = props;
  return (readOnly ?
    (
      <p {...attributes} >
        Musterlösung: {children}
      </p>
    ) : (
      <td {...attributes}>
        {children}
      </td>
    )
  );
}

const RenderSortingTaskNode = {
  renderNode(props: any, editor: Editor, next: () => void) {
    // append to parent, see add-section
    const { children, attributes, node, readOnly, isFocused
      , parent } = props;
    // console.log(props);
    if (node.type === "sorting-task") {
      return (
        <SortingTaskNode
          node={node}
          selected={isFocused}
          readOnly={readOnly}
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
          readOnly={readOnly}
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
          readOnly={readOnly}
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
          readOnly={readOnly}
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