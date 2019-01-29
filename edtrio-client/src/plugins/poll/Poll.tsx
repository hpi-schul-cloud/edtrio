import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ListEle from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import { List } from "immutable";
import React from "react";
import { Block, Editor, Node, Text } from "slate";
import { PollStateContext } from "../../context/PollStateContext";
import { apolloClient } from "../../EditorWrapper/apolloClient";
import {
  addSubmissionToPollAnswer,
  addSubmissionToPollAnswerVariables,
} from "../../graphqlOperations/generated-types/addSubmissionToPollAnswer";
import {
  createPoll,
  createPollVariables,
} from "../../graphqlOperations/generated-types/createPoll";
import {
  createPollAnswer,
  createPollAnswerVariables,
} from "../../graphqlOperations/generated-types/createPollAnswer";
import {
  poll,
  pollVariables,
} from "../../graphqlOperations/generated-types/poll";
import {
  ADD_SUBMISSION_TO_POLL_ANSWER,
  CREATE_POLL,
  CREATE_POLL_ANSWER,
  POLL_QUERY,
} from "../../graphqlOperations/operations";
import {
  checkAndDeletePollNode,
  testPollNodeValidity,
} from "./helpers/validity";
import TemplatePicker from "./TemplatePicker";
import PollTogglesEditMode from "./toggles/PollTogglesEditMode";
import PollTogglesReadOnlyMode from "./toggles/PollTogglesReadOnlyMode";

export function createPollAnswerDBEntryAndFetchId(pollId: any) {
  let Id;
  apolloClient
    .mutate<createPollAnswer, createPollAnswerVariables>({
      mutation: CREATE_POLL_ANSWER,
      variables: { pollId },
    })
    .then(pollAnswer => {
      // @ts-ignore: I just created it.......... amk
      Id = pollAnswer.data.createPollAnswer.id;
    });
  return Id;
}

function DBasifyPoll(pollNode: Block) {
  let pollId;
  apolloClient
    .mutate<createPoll, createPollVariables>({
      mutation: CREATE_POLL,
      variables: { votingAllowed: false, displayResults: false },
    })
    .then(poll => {
      // @ts-ignore: I just created it.......... amk
      pollId = poll.data.createPoll.id;
    });

  const neededDBAnswerEntries = pollNode.nodes.size - 1;
  const dbEntries = Array<any>();
  for (let index = 0; index < neededDBAnswerEntries; index++) {
    dbEntries.push(createPollAnswerDBEntryAndFetchId(pollId));
  }

  const newPollContent = Array<any>();
  newPollContent.push(
    Block.create({
      type: "poll_question",
      nodes: List([Text.create(pollNode.nodes[0].text)]),
    }),
  );
  dbEntries.forEach((answerId, idx) => {
    newPollContent.push(
      Block.create({
        type: "poll_question",
        nodes: List([Text.create(pollNode.nodes[idx + 1].text)]),
        data: { id: answerId },
      }),
    );
  });

  const newPollNode = Block.create({
    type: "poll",
    nodes: List(newPollContent),
    data: { id: pollId },
  });
}

export async function createNewPollAnswer(text: any = "") {
  if (!pollId) {
    return Block.create({
      type: "poll_answer",
      nodes: List([Text.create(text)]),
    });
  }

  if (pollAnswer.data) {
    return Block.create({
      type: "poll_answer",
      nodes: List([Text.create(text)]),
      data: { id: pollAnswer.data.createPollAnswer.id },
    });
  } else {
    return Block.create({
      type: "poll_answer",
      nodes: List([Text.create(text)]),
    });
  }
}

// TODO: add delete function

export default class PollNode extends React.Component<{
  readOnly: boolean;
  node: any;
  editor: any;
  currentUser: any;
  getUsersWhoHaveVoted: Function;
  selectedAnswer: any;
  votingAllowed: boolean;
  initState: Function;
}> {
  public componentDidMount() {
    // check for correct node creation
    setTimeout(() => {
      // TODO: Refactor pls
      testPollNodeValidity(
        this.props.editor,
        this.props.node,
        this.props.initState,
      ).then(() => this.setPollValuesFromDB());
    }, 200);
  }

  public render() {
    const { children, ...attributes } = this.props;

    return (
      <div>
        <ListEle {...attributes}>{children}</ListEle>
        {this.mainActionButton()}
        <br />
      </div>
    );
  }

  public componentWillUnmount() {
    checkAndDeletePollNode(this.props.editor, this.props.node);
  }

  private async setPollValuesFromDB() {
    const pollId = this.props.node.data.get("id");
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
    return this.props.readOnly
      ? this.props.currentUser.isTeacher
        ? this.controlToggles()
        : this.sendAnswerButton()
      : this.addEditToolbar();
  }

  private addEditToolbar() {
    return (
      <Grid
        style={{ paddingLeft: "30px" }}
        container={true}
        alignItems="center"
        justify="space-between"
      >
        <Grid item={true}>
          <TemplatePicker editor={this.props.editor} poll={this.props.node} />
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
    console.log("ansans");
    if (this.props.getUsersWhoHaveVoted().includes(this.props.currentUser.id)) {
      return <div>Glückwunsch, du hast bereits abgestimmt</div>;
    } else {
      return (
        <Button
          style={{ float: "right" }}
          variant="outlined"
          disabled={!this.props.votingAllowed}
          onClick={event => this.onClickSendAnswerButton()}
        >
          <SendIcon />
          &nbsp;&nbsp;&nbsp;Antwort senden
        </Button>
      );
    }
  }

  // TODO: Node should be used instead of any for 'node'
  private async onClickAddAnswerButton() {
    this.props.editor.insertNodeByPath(
      this.props.editor.value.document.getPath(this.props.node.key),
      this.props.node.nodes.size,
      await createNewPollAnswer(this.props.node.data.get("id")),
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

  private onClickStartPollButton() {
    // console.log("onClickStartPollButton");
  }

  private onClickShowPollResultButton() {
    // console.log("onClickShowPollResultButton");
  }
}
