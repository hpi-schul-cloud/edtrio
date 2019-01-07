import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";
import { Block, Editor } from "slate";

export default class PollAnswerNode extends React.Component<{
  readOnly: boolean;
  node: Block;
  editor: Editor;
  parent: Block;
}> {
  public render() {
    const {
      children,
      node,
      editor,
      readOnly,
      parent,
      ...attributes
    } = this.props;

    if (readOnly) {
      return this.renderReadOnlyMode(node, parent, attributes);
    } else {
      return this.renderEditMode(children, node, editor, attributes);
    }
  }

  private renderReadOnlyMode(node: Block, parent: Block, attributes: any) {
    const percentage = Math.floor(Math.random() * 100);
    const color = "#007A9E";
    const background = `linear-gradient(to right, ${color} ${0}%, ${color} ${percentage}%, white ${percentage}%, white ${100 -
      percentage}%)`;
    const name = `answer-radio-button-${parent.key}`;

    return (
      <ListItem
        style={{ background }}
        button={true}
        divider={true}
        {...attributes}
      >
        <Radio
          name={name}
          checked={this.isSelected(parent, node)}
          onChange={() => this.onChange(parent, node)}
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
    node: Block,
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

  private onChange(parent: Block, node: Block) {
    const x = parent.data.set("selected_answer", node.key);
    parent.data = x;
  }

  private isSelected(parent: Block, node: Block) {
    return parent.data.get("selected_answer") === node.key;
  }
  private deleteNode(editor: Editor, node: Block) {
    return editor.removeNodeByKey(node.key);
  }

  private onClickDeleteAnswerButton(event: any, editor: Editor, node: Block) {
    event.preventDefault();
    this.deleteNode(editor, node);
  }
}
