import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import ListEle from "@material-ui/core/List";
import Switch from "@material-ui/core/Switch";
import React from "react";
import { Block, Editor, Node, Text } from "slate";
import { PollStateContext } from "../../context/PollStateContext";

export default class ConfigBar extends React.Component<{}> {
  public state = {
    checkedA: true,
    checkedB: true,
  };
  public handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  public render() {
    const { ...attributes } = this.props;

    return (
      <PollStateContext.Consumer>
        {({ locked, updateLocked, showResults, updateShowResults }) => (
          <div>
            <FormGroup row={true}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!locked}
                    onChange={() => updateLocked(!locked)}
                    value="checkedA"
                    color="primary"
                  />
                }
                label="Abstimmen erlauben"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showResults}
                    onChange={() => updateShowResults(!showResults)}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Ergebnisse anzeigen"
              />
            </FormGroup>
            <br />
          </div>
        )}
      </PollStateContext.Consumer>
    );
  }
}
