import Button from "@material-ui/core/Button";
import ListEle from "@material-ui/core/List";
import RadioGroup from "@material-ui/core/RadioGroup";
import AddIcon from "@material-ui/icons/Add";
import PollIcon from "@material-ui/icons/Poll";
import SendIcon from "@material-ui/icons/Send";
import { List } from "immutable";
import React from "react";
import { Block, Editor, Node, Text } from "slate";
import { PollStateContext } from "../../context/PollStateContext";
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
      <PollStateContext.Consumer>
        {({ locked, updateLocked, updateShowResults }) => (
          <div>
            <ListEle {...attributes}>{children}</ListEle>
            <div className="right-align">
              {this.mainActionButton(
                editor,
                node,
                readOnly,
                currentUser,
                locked,
                updateLocked,
                updateShowResults,
              )}
            </div>
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
    updateLocked: Function,
    updateShowResults: Function,
  ) {
    return readOnly
      ? currentUser.isTeacher
        ? locked
          ? this.startPollButton(updateLocked)
          : this.showPollResultButton(updateShowResults)
        : this.sendAnswerButton(locked)
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

  private startPollButton(updateLocked: Function) {
    return (
      <Button
        style={{ float: "right" }}
        variant="outlined"
        onClick={event => updateLocked(false)}
      >
        <PollIcon />
        &nbsp;Umfrage starten
      </Button>
    );
  }

  private showPollResultButton(updateShowResults) {
    return (
      <Button
        style={{ float: "right" }}
        variant="outlined"
        onClick={event => updateShowResults(true)}
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
