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
import { apolloClient } from "../../EditorWrapper/apolloClient";
import {
  deletePollAnswer,
  deletePollAnswerVariables,
} from "../../graphqlOperations/generated-types/deletePollAnswer";
import { DELETE_POLL_ANSWER } from "../../graphqlOperations/operations";
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
  getUsersWhoHaveVoted: Function;
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

    const name = `answer-radio-button-${parent.key}`;
    return (
      <ListItem
        style={this.calculateBackground()}
        button={true}
        divider={true}
        onClick={this.selectAnswerIfAllowed.bind(this)}
        {...attributes}
      >
        <ListItemSecondaryAction>
          {this.displayResultTextIfNecessary()}
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
  private displayResultTextIfNecessary() {
    if (this.shouldDisplayResults()) {
      const votes = this.voteCount();
      // prettier-ignore
      return `${votes} ${votes === 1 ? "Stimme" : "Stimmen"} (${this.votePercentage()}%)`;
    } else {
      return null;
    }
  }

  private selectAnswerIfAllowed() {
    const { currentUser, updateSelectedAnswer } = this.props;
    if (currentUser.isTeacher || this.currentUserHasVoted()) {
      return;
    }
    updateSelectedAnswer(this.id());
  }

  private async onClickDeleteAnswerButton(
    event: any,
    editor: Editor,
    node: Block,
  ) {
    event.preventDefault();
    const pollAnswerId = this.id();
    this.deleteNode(editor, node);
    await apolloClient.mutate<deletePollAnswer, deletePollAnswerVariables>({
      mutation: DELETE_POLL_ANSWER,
      variables: { pollAnswerId },
    });
  }

  private calculateBackground() {
    if (this.shouldDisplayResults()) {
      return this.backgroundFillStyle();
    } else {
      return null;
    }
  }

  /*#################### HELPERS ################### */

  private shouldDisplayResults() {
    const { currentUser, displayResults } = this.props;
    return (
      currentUser.isTeacher || (displayResults && this.currentUserHasVoted())
    );
  }

  private deleteNode(editor: Editor, node: Block) {
    return editor.removeNodeByKey(node.key);
  }
  private currentUserHasVoted() {
    const { getUsersWhoHaveVoted, currentUser } = this.props;
    return getUsersWhoHaveVoted().includes(currentUser.id);
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
