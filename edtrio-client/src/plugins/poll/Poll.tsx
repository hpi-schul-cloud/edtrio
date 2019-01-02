import Button from "@material-ui/core/Button";
import ListEle from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import { List } from "immutable";
import React from "react";
import { Block, Editor, Node, Text } from "slate";

export default class PollNode extends React.Component<{
  readOnly: boolean;
  node: any;
  editor: any;
}> {
  public render() {
    const { children, node, editor, readOnly, ...attributes } = this.props;

    return (
      <div>
        <ListEle {...attributes}>{children}</ListEle>
        <div className="right-align">
          {this.mainActionButton(editor, node, readOnly)}
        </div>
      </div>
    );
  }

  private mainActionButton(editor: Editor, node: any, readOnly: boolean) {
    return readOnly
      ? this.sendAnswerButton()
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
  private onClickAddAnswerButton(event: any, editor: Editor, node: any) {
    event.preventDefault();
    this.appendNewAnswer(editor, node);
  }

  private appendNewAnswer(editor: Editor, node: any) {
    const newAnswer = Block.create({
      type: "poll_answer",
      nodes: List([Text.create("")]),
    });
    const lastIndex = node.nodes.size;

    return editor
      .insertNodeByKey(node.key, lastIndex, newAnswer)
      .moveToEndOfNode(newAnswer);
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
