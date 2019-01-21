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
const iconSize = "default";

abstract class PollToggles extends React.Component {
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
                      checked={!votingAllowed}
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

export class PollTogglesReadOnlyMode extends PollToggles {
  protected getResultsLabel(displayResults: boolean) {
    if (displayResults) {
      return "Ergebnisse freigeschaltet";
    } else {
      return "Ergebnisse nicht sichtbar";
    }
  }
  protected getVoteLabel(votingAllowed: boolean) {
    if (votingAllowed) {
      return "Nutzer dürfen nicht abstimmen";
    } else {
      return "Nutzer dürfen abstimmen";
    }
  }
}

export class PollTogglesEditMode extends PollToggles {
  protected getResultsLabel(displayResults: boolean) {
    if (displayResults) {
      return "Ergebnisse sofort anzeigen";
    } else {
      return "Ergebnisse manuell anzeigen";
    }
  }
  protected getVoteLabel(votingAllowed: boolean) {
    if (votingAllowed) {
      return "Abstimmen manuell freischlaten";
    } else {
      return "Abstimmen sofort freischlaten";
    }
  }
}
