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

export default class PollQuestionNode extends React.Component<{
  readOnly: boolean;
}> {
  public state = {
    isDialogOpen: false,
    children: null,
    editor: null,
    parent: null,
    attributes: null,
  };

  constructor(props) {
    super(props);
    const { children, editor, parent, readOnly, ...attributes } = props;
    this.state = {
      isDialogOpen: false,
      children,
      editor,
      parent,
      ...attributes,
    };
  }

  public render() {
    if (this.props.readOnly) {
      return this.renderReadOnly();
    } else {
      return this.renderEditMode();
    }
  }

  private renderReadOnly() {
    return (
      <ListItem divider={true} {...this.state.attributes}>
        <h2>{this.props.children}</h2>
      </ListItem>
    );
  }

  private renderEditMode() {
    return (
      <ListItem divider={true} {...this.state.attributes}>
        <h2>{this.props.children}</h2>
        <ListItemSecondaryAction>
          <IconButton onClick={this.openDialog} className="btn-flat">
            <CloseIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>

        <Dialog open={this.state.isDialogOpen}>
          <DialogTitle id="alert-dialog-title">Umfrage löschen</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bist du sicher, dass du die Umfrage löschen möchtest?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Abbrechen
            </Button>
            <Button onClick={event => this.deletePoll(event)} autoFocus={true}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  }
  private onClickDeletePollButton(event: any, editor: any, node: any) {
    event.preventDefault();
    this.deleteNode(editor, node);
  }

  private deleteNode(editor: any, node: any) {
    return editor.removeNodeByKey(node.key);
  }

  private openDialog = () => this.setState({ isDialogOpen: true });
  private closeDialog = () => this.setState({ isDialogOpen: false });
  private deletePoll(event: any) {
    this.onClickDeletePollButton(event, this.state.editor, this.state.parent);
    this.closeDialog();
  }
}
