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
import { PollStateContext } from "../../context/PollStateContext";
import {
  checkAndDeletePollAnswerNode,
  testPollAnswerNodeValidity,
} from "./helpers/validity";

// TODO: add delete function

export default class PollAnswerNode extends React.Component<{
  readOnly: boolean;
  node: Block;
  editor: Editor;
  parent: Block;
  currentUser: any;
  selectedAnswer: any;
  updateSelectedAnswer: Function;
  displayResults: boolean;
}> {
  public componentDidMount() {
    // check for correct node creation
    setTimeout(
      () =>
        testPollAnswerNodeValidity(
          this.props.editor,
          this.props.node,
          this.context,
          this.props.parent,
        ),
      200,
    );
  }

  public render() {
    const {
      children,
      node,
      editor,
      readOnly,
      parent,
      currentUser,
      selectedAnswer,
      updateSelectedAnswer,
      displayResults,
      ...attributes
    } = this.props;

    if (readOnly) {
      return this.renderReadOnlyMode(
        node,
        parent,
        currentUser,
        attributes,
        selectedAnswer,
        updateSelectedAnswer,
        displayResults,
      );
    } else {
      return this.renderEditMode(children, node, editor, attributes);
    }
  }

  public componentWillUnmount() {
    checkAndDeletePollAnswerNode(this.props.editor, this.props.node);
  }

  private renderReadOnlyMode(
    node: Block,
    parent: Block,
    currentUser: any,
    attributes: any,
    selectedAnswer: any,
    updateSelectedAnswer: Function,
    displayResults: boolean,
  ) {
    const name = `answer-radio-button-${parent.key}`;
    return (
      <ListItem
        style={this.calculateBackground(displayResults, currentUser)}
        button={true}
        divider={true}
        onClick={() => updateSelectedAnswer(node.key)}
        {...attributes}
      >
        <Radio
          name={name}
          checked={selectedAnswer === node.key}
          color="default"
          icon={<RadioButtonUncheckedIcon fontSize="small" />}
          checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
        />
        <ListItemText primary={node.text} />
      </ListItem>
    );
  }
  private calculateBackground(displayResults: boolean, currentUser: any) {
    if (!currentUser.isTeacher && !displayResults) {
      return null;
    }
    const percentage = Math.floor(Math.random() * 100);
    const color = "rgba(0,122,158,0.5)";
    const background = `linear-gradient(to right, ${color} ${0}%, ${color} ${percentage}%, white ${percentage}%, white ${100 -
      percentage}%)`;
    return { background };
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

  private deleteNode(editor: Editor, node: Block) {
    return editor.removeNodeByKey(node.key);
  }

  private onClickDeleteAnswerButton(event: any, editor: Editor, node: Block) {
    event.preventDefault();
    this.deleteNode(editor, node);
  }
}
PollAnswerNode.contextType = PollStateContext;
