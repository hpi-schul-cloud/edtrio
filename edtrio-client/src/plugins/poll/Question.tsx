import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { apolloClient } from "../../EditorWrapper/apolloClient";
import {
  deletePoll,
  deletePollVariables,
} from "../../graphqlOperations/generated-types/deletePoll";
import { DELETE_POLL } from "../../graphqlOperations/operations";

export default class PollQuestionNode extends React.Component<{
  readOnly: boolean;
  getTotalVotes: () => number;
  currentUser: any;
  getUsersWhoHaveVoted: any;
  displayResults: any;
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
    const {
      children,
      readOnly,
      getTotalVotes,
      currentUser,
      getUsersWhoHaveVoted,
      displayResults,
      ...attributes
    } = this.props;
    if (this.props.readOnly) {
      return this.renderReadOnly(attributes);
    } else {
      return this.renderEditMode(attributes);
    }
  }

  private renderReadOnly(attributes) {
    return (
      <ListItem divider={true} {...attributes}>
        <ListItemSecondaryAction>
          {this.voterCountTextIfNecessary()}
        </ListItemSecondaryAction>
        <h2>{this.props.children}</h2>
        <br />
      </ListItem>
    );
  }
  private currentUserHasVoted() {
    const { getUsersWhoHaveVoted, currentUser } = this.props;
    return getUsersWhoHaveVoted().includes(currentUser.id);
  }

  private voterCountTextIfNecessary() {
    const { currentUser, displayResults, getTotalVotes } = this.props;

    const votes = getTotalVotes();
    if (
      currentUser.isTeacher ||
      (displayResults && this.currentUserHasVoted())
    ) {
      // prettier-ignore
      return`${votes} Schüler ${votes === 1 ? "hat" : "haben"} abgestimmt`;
    }
    return;
  }

  private renderEditMode(attributes) {
    return (
      <ListItem divider={true} {...attributes}>
        <h2>{this.props.children}</h2>
        <ListItemSecondaryAction>
          <IconButton onClick={this.openDialog} className="btn-flat">
            <DeleteIcon fontSize="small" />
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
  private async onClickDeletePollButton(event: any, editor: any, node: any) {
    event.preventDefault();
    const pollId = node.data.get("id");
    this.deleteNode(editor, node);

    await apolloClient.mutate<deletePoll, deletePollVariables>({
      mutation: DELETE_POLL,
      variables: { pollId },
    });
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
