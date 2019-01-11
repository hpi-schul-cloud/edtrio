import Button from "@material-ui/core/Button";
import ListEle from "@material-ui/core/List";
import RadioGroup from "@material-ui/core/RadioGroup";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import { List } from "immutable";
import React from "react";
import { Block, Editor, Node, Text } from "slate";

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
}> {
  public render() {
    const {
      children,
      node,
      editor,
      readOnly,
      currentUser,
      ...attributes
    } = this.props;

    return (
      <div>
        <ListEle {...attributes}>{children}</ListEle>
        <div className="right-align">
          {this.mainActionButton(editor, node, readOnly, currentUser)}
        </div>
        <br />
      </div>
    );
  }

  private mainActionButton(
    editor: Editor,
    node: any,
    readOnly: boolean,
    currentUser: any,
  ) {
    return readOnly
      ? currentUser.isTeacher
        ? this.startPollButton()
        : this.sendAnswerButton()
      : this.addAnswerButton(editor, node);
  }

  private addAnswerButton(editor: Editor, node: any) {
    return (
      <Button
        style={{ float: "right" }}
        variant="outlined"
        onClick={event => this.onClickAddAnswerButton(event, editor, node)}
      >
        <AddIcon />
        &nbsp;Antwort hinzufügen
      </Button>
    );
  }

  private sendAnswerButton() {
    return (
      <Button
        style={{ float: "right" }}
        variant="outlined"
        onClick={event => this.onClickSendAnswerButton()}
      >
        <SendIcon />
        &nbsp;Antwort senden
      </Button>
    );
  }

  private startPollButton() {
    return (
      <Button
        style={{ float: "right" }}
        variant="outlined"
        onClick={event => this.onClickStartPollButton()}
      >
        <SendIcon />
        &nbsp;Umfrage starten
      </Button>
    );
  }

  private showPollResultButton() {
    return (
      <Button
        style={{ float: "right" }}
        variant="outlined"
        onClick={event => this.onClickShowPollResultButton()}
      >
        <SendIcon />
        &nbsp;Ergebnisse freischalten
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
