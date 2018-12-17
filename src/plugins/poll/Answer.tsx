import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import DeleteIcon from "@material-ui/icons/Delete";
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
  const percentage = Math.floor(Math.random() * 100);
  const color = "#007A9E";
  const background = `linear-gradient(to right, ${color} ${0}%, ${color} ${percentage}%, white ${percentage}%, white ${100 -
    percentage}%)`;

  if (readOnly) {
    return (
      <ListItem style={{ background }} button={true} divider={true}>
        <Radio name="ok" />
        <ListItemText primary={node.text} />
      </ListItem>
    );
  } else {
    return (
      <ListItem divider={true}>
        {children}
        <ListItemSecondaryAction>
          <IconButton
            onClick={event => onClickDeleteAnswerButton(event, editor, node)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
