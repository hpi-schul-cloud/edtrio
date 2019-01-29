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
import { checkAndDeletePollNode } from "./helpers/validity";
import TemplatePicker from "./TemplatePicker";
import PollTogglesEditMode from "./toggles/PollTogglesEditMode";
import PollTogglesReadOnlyMode from "./toggles/PollTogglesReadOnlyMode";

// TODO: add delete function

export default class PollNode extends React.Component<{
  readOnly: boolean;
  node: any;
  editor: any;
  currentUser: any;
  getUsersWhoHaveVoted: Function;
  selectedAnswer: any;
  votingAllowed: boolean;
  displayResults: boolean;
  initState: Function;
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

  public componentWillUnmount() {
    console.log("unmountedPoll");
    checkAndDeletePollNode(this.props.editor, this.props.node);
  }

  private async setPollValuesFromDB() {
    const pollId = this.id();
    if (pollId) {
      const poll = await apolloClient.query<poll, pollVariables>({
        query: POLL_QUERY,
        variables: { pollId },
      });
      if (poll && poll.data && poll.data.poll) {
        const { votingAllowed, displayResults, answers } = poll.data.poll;
        this.props.initState(pollId, votingAllowed, displayResults, answers);
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
        <Grid item={true}>
          <PollTogglesEditMode />
        </Grid>
        <Grid item={true}>
          <Button
            style={{ width: "250px", height: "56px" }}
            variant="outlined"
            onClick={this.onClickAddAnswerButton.bind(this)}
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

  private async onClickAddAnswerButton() {
    this.props.editor.insertNodeByPath(
      this.props.editor.value.document.getPath(this.props.node.key),
      this.props.node.nodes.size,
      await createNewPollAnswerForPoll(this.props.node.data.get("id")),
    );
  }

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
