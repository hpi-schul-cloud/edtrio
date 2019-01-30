import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { cloneAndDBasifyPoll } from "./helpers/pollManipulation";
import {
  getGradeMeTemplate,
  getEmptyTemplate,
  getFeedbackTemplate,
  getWebframeworksTemplate,
} from "./helpers/templates";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    minWidth: 200,
  },
});

class TemplatePicker extends React.Component {
  state = {
    labelWidth: 0,
    template: undefined,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = async (event, editor, poll) => {
    this.setState({ template: event.target.value });
    let placeholderTemplate;
    if (event.target.value === "feedback") {
      placeholderTemplate = getFeedbackTemplate();
    }
    if (event.target.value === "rate") {
      placeholderTemplate = getGradeMeTemplate();
    }
    if (event.target.value === "empty") {
      placeholderTemplate = getEmptyTemplate();
    }
    if (event.target.value === "webframeworks") {
      placeholderTemplate = getWebframeworksTemplate();
    }
    editor.replaceNodeByKey(poll.key, placeholderTemplate);
    // TODO: also delete old poll from DB
    const stateValues = {
      votingAllowed: this.props.votingAllowed,
      displayResults: this.props.displayResults,
    };
    let dbasifiedTemplate = await cloneAndDBasifyPoll(
      placeholderTemplate,
      stateValues,
    );
    editor.replaceNodeByKey(placeholderTemplate.key, dbasifiedTemplate);
  };

  render() {
    const { classes, editor, poll } = this.props;

    const name = `dropdown-template-${poll.key}`;
    return (
      <div className={classes.root}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor={name}
          >
            Vorlage
          </InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={event => this.handleChange(event, editor, poll)}
            input={
              <OutlinedInput
                name="template"
                labelWidth={this.state.labelWidth}
                id={name}
              />
            }
          >
            <option value="" />
            <option value="empty">Leer</option>
            <option value="feedback">Feedback</option>
            <option value="rate">Bewertung</option>
            <option value="webframeworks">Webframeworks</option>
          </Select>
        </FormControl>
      </div>
    );
  }
}

TemplatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemplatePicker);
