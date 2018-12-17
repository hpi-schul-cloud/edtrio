import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

import React from "react";

// import { Editor } from "slate";

const onClickDeletePollButton = (event: any, editor: any, node: any) => {
  event.preventDefault();
  deleteNode(editor, node);
};

const deleteNode = (editor: any, node: any) => {
  return editor.removeNodeByKey(node.key);
};

export default class PollQuestionNode extends React.Component {
  public state = {
    open: false,
    children: null,
    editor: null,
    parent: null,
    attributes: null,
  };

  constructor(props) {
    super(props);
    const { children, editor, parent, ...attributes } = props;
    this.state = {
      open: false,
      children,
      editor,
      parent,
      ...attributes,
    };
  }

  public render() {
    return (
      <li className="collection-header" {...this.state.attributes}>
        <div className="row">
          <div className="col s11">
            <h2>{this.props.children}</h2>
          </div>
          <div className="col s1">
            {" "}
            <IconButton onClick={this.openModal} className="btn-flat">
              <CloseIcon/>
            </IconButton>
            <Dialog open={this.state.open}>
              <DialogTitle id="alert-dialog-title">Umfrage löschen</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Bist du sicher, dass du die Umfrage löschen möchtest?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Abbrechen
                </Button>
                <Button
                  onClick={event => this.deletePoll(event)}
                  autoFocus={true}
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </li>
    );
  }

  private openModal = () => this.setState({ open: true });
  private handleClose = () => this.setState({ open: false });
  private deletePoll = (event: any) => {
    onClickDeletePollButton(event, this.state.editor, this.state.parent);
    this.setState({ open: false });
  };
}
