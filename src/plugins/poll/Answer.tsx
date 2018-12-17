import React from "react";
import { Editor } from "slate";

import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from "@material-ui/core/Radio";
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

  if (readOnly) {
    return (
      <ListItem>
        <Radio  name = "ok"/>
        <ListItemText primary={node.text} />
      </ListItem>
    )
  } else {
    return (
      <ListItem {...attributes}>
        <Radio  name = "ok"/>
        {children}
        <ListItemSecondaryAction>
          <IconButton onClick={event => onClickDeleteAnswerButton(event, editor, node)}>
            <DeleteIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  
}
