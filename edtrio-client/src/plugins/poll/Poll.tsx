import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ListEle from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import { List } from "immutable";
import React from "react";
import { Subscription } from "react-apollo";
import { Block, Editor, Node, Text } from "slate";
import { PollStateContext } from "../../context/PollStateContext";
import { apolloClient } from "../../EditorWrapper/apolloClient";
import {
  checkAndDeletePollNode,
  testPollNodeValidity,
} from "./helpers/validity";
import TemplatePicker from "./TemplatePicker";
import PollTogglesEditMode from "./toggles/PollTogglesEditMode";
import PollTogglesReadOnlyMode from "./toggles/PollTogglesReadOnlyMode";

import {
  poll,
  pollVariables,
} from "../../graphqlOperations/generated-types/poll";

import {
  pollChanged,
  pollChangedVariables,
} from "../../graphqlOperations/generated-types/pollChanged";

import { POLL_CHANGED, POLL_QUERY } from "../../graphqlOperations/operations";

export function createNewPollAnswer() {
  return Block.create({
    type: "poll_answer",
    nodes: List([Text.create("")]),
  });
}

// TODO: add delete function

class PollSubscription extends Subscription<
  pollChanged,
  pollChangedVariables
> {}

export default class PollNode extends React.Component<{
  readOnly: boolean;
  node: any;
  editor: any;
  currentUser: any;
}> {
  public componentDidMount() {
    // check for correct node creation
    setTimeout(() => {
      testPollNodeValidity(this.props.editor, this.props.node, this.context);
      this.setPollValuesFromDB();
    }, 200);
  }

  public render() {
    const {
      children,
      node,
      editor,
      readOnly,
      currentUser,
      ...attributes
    } = this.props;

    const pollId = this.props.node.data.get("id");

    return (
      <PollSubscription subscription={POLL_CHANGED} variables={{ pollId }}>
        {({ data: subscriptionData }) => {
          if (subscriptionData && subscriptionData.pollChanged) {
            this.context.updateDisplayResults(
              subscriptionData.pollChanged.displayResults,
            );
            this.context.updateVotingAllowed(
              subscriptionData.pollChanged.votingAllowed,
            );
          }
          return (
            <PollStateContext.Consumer>
              {({
                votingAllowed,
                updateVotingAllowed,
                updateDisplayResults,
              }) => (
                <div>
                  <ListEle {...attributes}>{children}</ListEle>

                  {this.mainActionButton(
                    editor,
                    node,
                    readOnly,
                    currentUser,
                    votingAllowed,
                  )}

                  <br />
                </div>
              )}
            </PollStateContext.Consumer>
          );
        }}
      </PollSubscription>
    );
  }

  public componentWillUnmount() {
    checkAndDeletePollNode(this.props.editor, this.props.node);
  }

  private async setPollValuesFromDB() {
    const pollId = this.props.node.data.get("id");
    if (pollId) {
      this.context.updateId(pollId);
      const poll = await apolloClient.query<poll, pollVariables>({
        query: POLL_QUERY,
        variables: { pollId },
      });

      if (poll.data.poll) {
        this.context.updateDisplayResults(poll.data.poll.displayResults);
        this.context.updateVotingAllowed(poll.data.poll.votingAllowed);
      }
    }
  }

  private mainActionButton(
    editor: Editor,
    node: any,
    readOnly: boolean,
    currentUser: any,
    votingAllowed: boolean,
  ) {
    return readOnly
      ? currentUser.isTeacher
        ? this.controlToggles()
        : this.sendAnswerButton(votingAllowed)
      : this.addEditToolbar(editor, node);
  }

  private addEditToolbar(editor: Editor, node: any) {
    return (
      <Grid
        style={{ paddingLeft: "30px" }}
        container={true}
        alignItems="center"
        justify="space-between"
      >
        <Grid item={true}>
          <TemplatePicker editor={editor} pollkey={node.key} />
        </Grid>
        <Grid item={true}>
          <PollTogglesEditMode />
        </Grid>
        <Grid item={true}>
          <Button
            style={{ width: "250px", height: "56px" }}
            variant="outlined"
            onClick={event => this.onClickAddAnswerButton(event, editor, node)}
          >
            <AddIcon />
            &nbsp;Antwort hinzufügen
          </Button>
        </Grid>
      </Grid>
    );
  }

  private controlToggles() {
    return <PollTogglesReadOnlyMode />;
  }

  private sendAnswerButton(votingAllowed: boolean) {
    return (
      <Button
        style={{ float: "right" }}
        variant="outlined"
        disabled={votingAllowed}
        onClick={event => this.onClickSendAnswerButton()}
      >
        <SendIcon />
        &nbsp;&nbsp;&nbsp;Antwort senden
      </Button>
    );
  }

  // TODO: Node should be used instead of any for 'node'
  private onClickAddAnswerButton(event: any, editor: Editor, node: Block) {
    editor.insertNodeByPath(
      editor.value.document.getPath(node.key),
      node.nodes.size,
      createNewPollAnswer(),
    );
  }

  private onClickSendAnswerButton() {
    // console.log("onClickSendAnswerButton");
  }

  private onClickStartPollButton() {
    // console.log("onClickStartPollButton");
  }

  private onClickShowPollResultButton() {
    // console.log("onClickShowPollResultButton");
  }
}
PollNode.contextType = PollStateContext;
