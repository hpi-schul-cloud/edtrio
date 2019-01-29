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
  getAnswerInformation: Function;
  getTotalVotes: Function;
}> {
  public readonly color = "rgba(0,122,158,0.5)";
  public readonly leadingColor = "rgba(76,175,80,0.5)";

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
      getAnswerInformation,
      getTotalVotes,
      ...attributes
    } = this.props;

    if (readOnly) {
      return this.renderReadOnlyMode(attributes);
    } else {
      return this.renderEditMode(attributes);
    }
  }

  // public componentWillUnmount() {
  //   checkAndDeletePollAnswerNode(this.props.editor, this.props.node);
  // }

  private renderReadOnlyMode(attributes: any) {
    const {
      node,
      parent,
      selectedAnswer,
      updateSelectedAnswer,
      getTotalVotes,
    } = this.props;
    const votes = this.voteCount();
    const name = `answer-radio-button-${parent.key}`;
    return (
      <ListItem
        style={this.calculateBackground()}
        button={true}
        divider={true}
        onClick={() => updateSelectedAnswer(node.data.get("id"))}
        {...attributes}
      >
        <ListItemSecondaryAction>
          {votes} {votes === 1 ? "Stimme" : "Stimmen"} ({this.votePercentage()}
          %)
        </ListItemSecondaryAction>
        <Radio
          name={name}
          checked={selectedAnswer === node.data.get("id")}
          color="default"
          icon={<RadioButtonUncheckedIcon fontSize="small" />}
          checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
        />
        <ListItemText primary={node.text} />
      </ListItem>
    );
  }

  private renderEditMode(attributes: any) {
    const { children, node, editor } = this.props;
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

  private calculateBackground() {
    const { currentUser, displayResults } = this.props;

    if (!currentUser.isTeacher && !displayResults) {
      return null;
    }

    return this.backgroundFillStyle();
  }

  private backgroundFillStyle() {
    const percentage = this.votePercentage();
    const bgColor = this.backgroundColor();
    const background = `linear-gradient(to right, ${bgColor} ${0}%, ${bgColor} ${percentage}%, white ${percentage}%, white ${100 -
      percentage}%)`;
    return { background };
  }

  private votePercentage() {
    const totalVotes = this.props.getTotalVotes();
    const percentage =
      totalVotes === 0 ? 0 : Math.floor((this.voteCount() / totalVotes) * 100);

    return percentage;
  }

  private backgroundColor() {
    return this.isLeading() ? this.leadingColor : this.color;
  }

  private voteCount() {
    return this.props.getAnswerInformation(this.id()).votesCount;
  }

  private isLeading() {
    return this.props.getAnswerInformation(this.id()).isLeading;
  }

  private id() {
    return this.props.node.data.get("id");
  }
}
