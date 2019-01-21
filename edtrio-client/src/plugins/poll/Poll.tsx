import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ListEle from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import PollIcon from "@material-ui/icons/Poll";
import SendIcon from "@material-ui/icons/Send";
import { List } from "immutable";
import React from "react";
import { Block, Editor, Node, Text } from "slate";
import { PollStateContext } from "../../context/PollStateContext";
import Dropdown from "./Dropdown";
import PollToggles from "./PollToggles";

export function createNewAnswer() {
  return Block.create({
    type: "poll_answer",
    nodes: List([Text.create("")]),
  });
}

export default class PollNode extends React.Component<{
  readOnly: boolean;
  node: any;
  editor: any;
  currentUser: any;
  parent: any;
}> {
  public render() {
    const {
      children,
      node,
      editor,
      readOnly,
      currentUser,
      parent,
      ...attributes
    } = this.props;

    return (
      <PollStateContext.Consumer>
        {({ locked, updateLocked, updateShowResults }) => (
          <div>
            <ListEle {...attributes}>{children}</ListEle>

            {this.mainActionButton(
              editor,
              node,
              readOnly,
              currentUser,
              locked,
              parent,
            )}

            <br />
          </div>
        )}
      </PollStateContext.Consumer>
    );
  }

  private mainActionButton(
    editor: Editor,
    node: any,
    readOnly: boolean,
    currentUser: any,
    locked: boolean,
    parent: Block,
  ) {
    return readOnly
      ? currentUser.isTeacher
        ? this.controlToggles()
        : this.sendAnswerButton(locked)
      : this.addAnswerButton(editor, node, parent);
  }

  private addAnswerButton(editor: Editor, node: any, parent: Block) {
    return (
      <Grid container={true} alignItems="center" justify="space-around">
        <Grid item={true}>
          <Dropdown parent={parent} editor={editor} pollkey={node.key} />
        </Grid>
        <Grid item={true}>
          <Button
            style={{ width: "200px", height: "56px" }}
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
    return <PollToggles />;
  }

  private sendAnswerButton(locked: boolean) {
    return (
      <Button
        style={{ float: "right" }}
        variant="outlined"
        disabled={locked}
        onClick={event => this.onClickSendAnswerButton()}
      >
        <SendIcon />
        &nbsp;Antwort senden
      </Button>
    );
  }

  // TODO: Node should be used instead of any for 'node'
  private onClickAddAnswerButton(event: any, editor: Editor, node: Block) {
    event.preventDefault();
    this.appendNewAnswer(editor, node);
  }

  private appendNewAnswer(editor: Editor, node: Block) {
    const newAnswer = createNewAnswer();
    const answerGroup: any = node.nodes.get(1);
    editor.insertNodeByKey(answerGroup.key, answerGroup.nodes.size, newAnswer);
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
