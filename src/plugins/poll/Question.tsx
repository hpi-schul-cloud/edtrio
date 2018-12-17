import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const onClickDeletePollButton = (event: any, editor: any, node: any) => {
  event.preventDefault();
  deleteNode(editor, node);
};

const deleteNode = (editor: any, node: any) => {
  return editor.removeNodeByKey(node.key);
};

export default class PollQuestionNode extends React.Component<{
  readOnly: boolean;
}> {
  public state = {
    open: false,
    children: null,
    editor: null,
    parent: null,
    attributes: null,
  };

  constructor(props) {
    super(props);
    const { children, editor, parent, readOnly, ...attributes } = props;
    this.state = {
      open: false,
      children,
      editor,
      parent,
      ...attributes,
    };
  }

  public render() {
    if (this.props.readOnly) {
      return (
        <ListItem divider={true} {...this.state.attributes}>
          <h2>{this.props.children}</h2>
        </ListItem>
      );
    } else {
      return (
        <ListItem divider={true} {...this.state.attributes}>
          <h2>{this.props.children}</h2>
          <ListItemSecondaryAction>
            <IconButton onClick={this.openModal} className="btn-flat">
              <CloseIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>

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
        </ListItem>
      );
    }
  }

  private openModal = () => this.setState({ open: true });
  private handleClose = () => this.setState({ open: false });
  private deletePoll = (event: any) => {
    onClickDeletePollButton(event, this.state.editor, this.state.parent);
    this.setState({ open: false });
  };
}
