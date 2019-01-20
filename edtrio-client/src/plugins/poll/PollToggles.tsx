import Checkbox from "@material-ui/core/Checkbox";
import grey from "@material-ui/core/colors/grey";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import VoteAllowedIcon from "@material-ui/icons/SpeakerNotes";
import VoteForbiddenIcon from "@material-ui/icons/SpeakerNotesOff";
import VisibleIcon from "@material-ui/icons/Visibility";
import InvisibleIcon from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Block, Editor, Node, Text } from "slate";
import { PollStateContext } from "../../context/PollStateContext";

const useStyles = makeStyles({
  root: {
    color: grey[800],
    "&$checked": {
      color: grey[900],
    },
  },
  checked: {},
});

export default class PollToggles extends React.Component {
  public render() {
    const classes = useStyles();

    return (
      <PollStateContext.Consumer>
        {({ locked, updateLocked, showResults, updateShowResults }) => (
          <Grid container={true} justify="space-evenly" alignItems="center">
            <FormControlLabel
              classes={{ label: "pollToggleLabel" }}
              control={
                <Checkbox
                  checked={!locked}
                  icon={<VoteForbiddenIcon fontSize="large" />}
                  checkedIcon={<VoteAllowedIcon fontSize="large" />}
                  onChange={() => updateLocked(!locked)}
                  value="checkedA"
                  color="primary"
                />
              }
              label={this.getVoteLabel(locked)}
            />
            <FormControlLabel
              classes={{ label: "pollToggleLabel" }}
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  checked={showResults}
                  icon={<InvisibleIcon fontSize="large" />}
                  checkedIcon={<VisibleIcon fontSize="large" />}
                  onChange={() => updateShowResults(!showResults)}
                  value="checkedB"
                  color="primary"
                />
              }
              label={this.getResultsLabel(showResults)}
            />

            <br />
          </Grid>
        )}
      </PollStateContext.Consumer>
    );
  }

  private getResultsLabel(showResults: boolean) {
    if (showResults) {
      return "Ergebnisse freigeschaltet";
    } else {
      return "Ergebnisse nicht sichtbar";
    }
  }
  private getVoteLabel(isLocked: boolean) {
    if (isLocked) {
      return "Nutzer dürfen nicht abstimmen";
    } else {
      return "Nutzer dürfen abstimmen";
    }
  }
}
