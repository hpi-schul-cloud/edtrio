import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ListEle from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import React from "react";
import { apolloClient } from "../../EditorWrapper/apolloClient";
import {
  addSubmissionToPollAnswer,
  addSubmissionToPollAnswerVariables,
} from "../../graphqlOperations/generated-types/addSubmissionToPollAnswer";
import {
  poll,
  pollVariables,
} from "../../graphqlOperations/generated-types/poll";
import {
  ADD_SUBMISSION_TO_POLL_ANSWER,
  POLL_QUERY,
} from "../../graphqlOperations/operations";
import { createNewPollAnswerForPoll } from "./helpers/pollManipulation";
import TemplatePicker from "./TemplatePicker";
import PollTogglesEditMode from "./toggles/PollTogglesEditMode";
import PollTogglesReadOnlyMode from "./toggles/PollTogglesReadOnlyMode";

export default class PollNode extends React.Component<{
  readOnly: boolean;
  node: any;
  editor: any;
  currentUser: any;
  getUsersWhoHaveVoted: () => string[];
  selectedAnswer: any;
  votingAllowed: boolean;
  displayResults: boolean;
  initState: (
    id: string,
    votingAllowed: boolean,
    displayResults: boolean,
    answers: any,
    currentUser: any,
  ) => {};
}> {
  public render() {
    const {
      readOnly,
      node,
      editor,
      currentUser,
      getUsersWhoHaveVoted,
      selectedAnswer,
      votingAllowed,
      initState,
      children,
      displayResults,
      ...attributes
    } = this.props;

    return (
      <div>
        <ListEle {...attributes}>{children}</ListEle>
        {this.mainActionButton()}
        <br />
      </div>
    );
  }

  public componentDidMount() {
    // check for correct node creation
    setTimeout(() => this.setPollValuesFromDB(), 200);
  }

  private async setPollValuesFromDB() {
    const pollId = this.id();
    if (pollId) {
      const pollQuery = await apolloClient.query<poll, pollVariables>({
        query: POLL_QUERY,
        variables: { pollId },
      });
      if (pollQuery && pollQuery.data && pollQuery.data.poll) {
        const { currentUser } = this.props;
        const { votingAllowed, displayResults, answers } = pollQuery.data.poll;
        this.props.initState(
          pollId,
          votingAllowed,
          displayResults,
          answers,
          currentUser,
        );
      }
    }
  }

  private mainActionButton() {
    const { readOnly, currentUser } = this.props;

    return readOnly
      ? currentUser.isTeacher
        ? this.controlToggles()
        : this.sendAnswerButton()
      : this.addEditToolbar();
  }

  private addEditToolbar() {
    const { editor, node, votingAllowed, displayResults } = this.props;

    return (
      <Grid
        style={{ paddingLeft: "30px" }}
        container={true}
        spacing={24}
        alignItems="center"
        justify="space-between"
      >
        <Grid item={true}>
          <TemplatePicker
            votingAllowed={votingAllowed}
            displayResults={displayResults}
            editor={editor}
            poll={node}
          />
        </Grid>
        <Grid xs={true} item={true}>
          <PollTogglesEditMode />
        </Grid>
        <Grid item={true}>
          <Button
            style={{ width: "250px", height: "56px" }}
            variant="outlined"
            onClick={this.onClickAddAnswerButton}
          >
            <AddIcon />
            &nbsp;Antwort hinzufügen
          </Button>
        </Grid>
      </Grid>
    );
  }

  private controlToggles() {
    return (
      <div style={{ paddingLeft: "30px" }}>
        <PollTogglesReadOnlyMode />
      </div>
    );
  }

  private sendAnswerButton() {
    const { votingAllowed } = this.props;

    const alreadyVoted = this.currentUserHasVoted();
    return (
      <Button
        style={{ float: "right" }}
        variant="outlined"
        disabled={!votingAllowed || alreadyVoted}
        onClick={event => this.onClickSendAnswerButton()}
      >
        <SendIcon />
        {this.sendAnswerButtonText(alreadyVoted)}
      </Button>
    );
  }

  private sendAnswerButtonText(alreadyVoted) {
    return alreadyVoted
      ? " Glückwunsch, du hast bereits abgestimmt"
      : " Antwort senden";
  }

  private currentUserHasVoted() {
    const { getUsersWhoHaveVoted, currentUser } = this.props;
    return getUsersWhoHaveVoted().includes(currentUser.id);
  }

  private onClickAddAnswerButton = async () => {
    this.props.editor.insertNodeByPath(
      this.props.editor.value.document.getPath(this.props.node.key),
      this.props.node.nodes.size,
      await createNewPollAnswerForPoll(this.props.node.data.get("id")),
    );
  };

  private async onClickSendAnswerButton() {
    const { selectedAnswer, node } = this.props;
    await apolloClient.mutate<
      addSubmissionToPollAnswer,
      addSubmissionToPollAnswerVariables
    >({
      mutation: ADD_SUBMISSION_TO_POLL_ANSWER,
      variables: {
        pollId: node.data.get("id"),
        pollAnswerId: selectedAnswer,
        userId: this.props.currentUser.id,
      },
    });
  }

  private id() {
    return this.props.node.data.get("id");
  }
}
