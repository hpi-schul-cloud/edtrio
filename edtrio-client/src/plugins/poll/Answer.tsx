import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import DeleteIcon from "@material-ui/icons/Delete";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";
import { Editor } from "slate";

export default class PollAnswerNode extends React.Component<{
  readOnly: boolean;
  node: any;
  editor: any;
}> {
  public render() {
    const { children, node, editor, readOnly, ...attributes } = this.props;

    if (readOnly) {
      return this.renderReadOnly(node.text);
    } else {
      return this.renderEditMode(children, node, editor);
    }
  }

  private renderReadOnly(text: string) {
    const percentage = Math.floor(Math.random() * 100);
    const color = "#007A9E";
    const background = `linear-gradient(to right, ${color} ${0}%, ${color} ${percentage}%, white ${percentage}%, white ${100 -
      percentage}%)`;

    return (
      <ListItem style={{ background }} button={true} divider={true}>
        <Radio
          name="ok"
          icon={<RadioButtonUncheckedIcon fontSize="small" />}
          checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
        />
        <ListItemText primary={text} />
      </ListItem>
    );
  }

  private renderEditMode(children: any, node: any, editor: any) {
    return (
      <ListItem divider={true}>
        <ListItemSecondaryAction>
          <IconButton
            onClick={event =>
              this.onClickDeleteAnswerButton(event, editor, node)
            }
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
        <Radio
          name="ok"
          disabled={true}
          icon={<RadioButtonUncheckedIcon fontSize="small" />}
          checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
        />
        {children}
      </ListItem>
    );
  }

  private deleteNode(editor: Editor, node: any) {
    return editor.removeNodeByKey(node.key);
  }

  private onClickDeleteAnswerButton(event: any, editor: Editor, node: any) {
    event.preventDefault();
    this.deleteNode(editor, node);
  }
}
