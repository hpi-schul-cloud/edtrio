import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import VoteAllowedIcon from "@material-ui/icons/SpeakerNotes";
import VoteForbiddenIcon from "@material-ui/icons/SpeakerNotesOffOutlined";
import VisibleIcon from "@material-ui/icons/Visibility";
import InvisibleIcon from "@material-ui/icons/VisibilityOffOutlined";
import React from "react";
import { PollStateContext } from "../../../context/poll/PollStateContext";

const iconSize = "default";

export default abstract class PollToggles extends React.Component {
  public render() {
    return (
      <PollStateContext.Consumer>
        {({
          votingAllowed,
          updateVotingAllowed,
          displayResults,
          updateDisplayResults,
        }) => (
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
                      checked={votingAllowed}
                      icon={<VoteForbiddenIcon fontSize={iconSize} />}
                      checkedIcon={<VoteAllowedIcon fontSize={iconSize} />}
                      onChange={() => updateVotingAllowed(!votingAllowed)}
                      color="default"
                    />
                  }
                  label={this.getVoteLabel(votingAllowed)}
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
                      checked={displayResults}
                      icon={<InvisibleIcon fontSize={iconSize} />}
                      checkedIcon={<VisibleIcon fontSize={iconSize} />}
                      onChange={() => updateDisplayResults(!displayResults)}
                      value="checkedB"
                      color="default"
                    />
                  }
                  label={this.getResultsLabel(displayResults)}
                />
              </Tooltip>
            </Grid>

            <br />
          </Grid>
        )}
      </PollStateContext.Consumer>
    );
  }

  protected abstract getResultsLabel(displayResults: boolean);
  protected abstract getVoteLabel(votingAllowed: boolean);
}
