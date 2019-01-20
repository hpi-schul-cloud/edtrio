import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import grey from "@material-ui/core/colors/grey";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import VoteAllowedIcon from "@material-ui/icons/SpeakerNotes";
import VoteForbiddenIcon from "@material-ui/icons/SpeakerNotesOffOutlined";
import VisibleIcon from "@material-ui/icons/Visibility";
import InvisibleIcon from "@material-ui/icons/VisibilityOffOutlined";

import React from "react";
import { Block, Editor, Node, Text } from "slate";
import { PollStateContext } from "../../context/PollStateContext";

export default class PollToggles extends React.Component {
  public render() {
    return (
      <PollStateContext.Consumer>
        {({ locked, updateLocked, showResults, updateShowResults }) => (
          <Grid container={true} justify="space-evenly" alignItems="center">
            <Grid
              container={true}
              xs={true}
              justify="space-evenly"
              alignItems="center"
            >
              <Tooltip title="Klicken, um anzupassen">
                <FormControlLabel
                  classes={{ label: "pollToggleLabel" }}
                  control={
                    <Checkbox
                      checked={!locked}
                      icon={<VoteForbiddenIcon fontSize="large" />}
                      checkedIcon={<VoteAllowedIcon fontSize="large" />}
                      onChange={() => updateLocked(!locked)}
                      color="default"
                    />
                  }
                  label={this.getVoteLabel(locked)}
                />
              </Tooltip>
            </Grid>
            <Grid
              container={true}
              xs={true}
              justify="space-evenly"
              alignItems="center"
            >
              <Tooltip title="Klicken, um anzupassen">
                <FormControlLabel
                  classes={{ label: "pollToggleLabel" }}
                  control={
                    <Checkbox
                      checked={showResults}
                      icon={<InvisibleIcon fontSize="large" />}
                      checkedIcon={<VisibleIcon fontSize="large" />}
                      onChange={() => updateShowResults(!showResults)}
                      value="checkedB"
                      color="default"
                    />
                  }
                  label={this.getResultsLabel(showResults)}
                />
              </Tooltip>
            </Grid>

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
