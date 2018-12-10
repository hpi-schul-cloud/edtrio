import React from "react";
import { Editor } from "slate";

// 0 122 158

const deleteNode = (editor: Editor, node: any) => {
  return editor.removeNodeByKey(node.key);
};

const onClickDeleteAnswerButton = (event: any, editor: Editor, node: any) => {
  event.preventDefault();
  deleteNode(editor, node);
};

export default function PollAnswerNode(props: any) {
  const { children, node, editor, parentKey, readOnly, ...attributes } = props;

  const deleteAnswerButton = readOnly ? (
    <div className="col s1 right-align" />
  ) : (
    <div className="col s1 right-align">
      <button
        className="btn-flat"
        onClick={event => onClickDeleteAnswerButton(event, editor, node)}
      >
        <i className="material-icons right">delete</i>
      </button>
    </div>
  );
  return (
    <li className="collection-item row" {...attributes}>
      <label className="col s11">
        <input type="radio" name={"answergroup" + parentKey} />
        <span>{children}</span>
      </label>
      {deleteAnswerButton}
    </li>
  );
}
