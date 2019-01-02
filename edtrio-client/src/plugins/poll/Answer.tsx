import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";
import { Editor, Node } from "slate";

export default class PollAnswerNode extends React.Component<{
  readOnly: boolean;
  node: Node;
  editor: Editor;
  parentKey: number;
}> {
  public render() {
    const {
      children,
      node,
      editor,
      readOnly,
      parentKey,
      ...attributes
    } = this.props;

    if (readOnly) {
      return this.renderReadOnlyMode(node, parentKey, attributes);
    } else {
      return this.renderEditMode(children, node, editor, attributes);
    }
  }

  private renderReadOnlyMode(node: Node, parentKey: number, attributes: any) {
    const percentage = Math.floor(Math.random() * 100);
    const color = "#007A9E";
    const background = `linear-gradient(to right, ${color} ${0}%, ${color} ${percentage}%, white ${percentage}%, white ${100 -
      percentage}%)`;
    const name = `answer-radio-button-${parentKey}`;

    return (
      <ListItem
        style={{ background }}
        button={true}
        divider={true}
        {...attributes}
      >
        <Radio
          name={name}
          color="default"
          icon={<RadioButtonUncheckedIcon fontSize="small" />}
          checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
        />
        <ListItemText primary={node.text} />
      </ListItem>
    );
  }

  private renderEditMode(
    children: any,
    node: Node,
    editor: Editor,
    attributes: any,
  ) {
    return (
      <ListItem divider={true} {...attributes}>
        <ListItemSecondaryAction>
          <IconButton
            onClick={event =>
              this.onClickDeleteAnswerButton(event, editor, node)
            }
          >
            <CloseIcon fontSize="small" />
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

  private deleteNode(editor: Editor, node: Node) {
    return editor.removeNodeByKey(node.key);
  }

  private onClickDeleteAnswerButton(event: any, editor: Editor, node: Node) {
    event.preventDefault();
    this.deleteNode(editor, node);
  }
}
