import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { List } from "immutable";
import { Block, Text } from "slate";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    minWidth: 200,
  },
});
function createNewAnswer(str) {
  return Block.create({
    type: "poll_answer",
    nodes: List([Text.create(str)]),
  });
}

function getFeedbackTemplate() {
  return Block.create({
    type: "poll",
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([
          Text.create("Was hat dir in der heutigen Stunde am meisten gefehlt?"),
        ]),
      }),
      createNewAnswer("Nichts! Ich bin zufrieden"),
      createNewAnswer("Zeit. Ich hätte gerne mehr Zeit gehabt"),
      createNewAnswer("Erklärung. Ich habe kaum etwas verstanden"),
      createNewAnswer("Vielfalt. Irgendwie war es langweilig heute"),
      createNewAnswer("Ruhe. Es war viel zu laut"),
      createNewAnswer(
        "Feedback. Ich brauche mehr Rückmeldung zu meiner Arbeit",
      ),
    ]),
  });
}
function getGradeMeTemplate() {
  return Block.create({
    type: "poll",
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([
          Text.create("Wie würdest du die Stunde in Schulnoten bewerten?"),
        ]),
      }),
      createNewAnswer("1"),
      createNewAnswer("2"),
      createNewAnswer("3"),
      createNewAnswer("4"),
      createNewAnswer("5"),
      createNewAnswer("6"),
    ]),
  });
}

function getEmptyTemplate() {
  return Block.create({
    type: "poll",
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([Text.create("")]),
      }),
      createNewAnswer(""),
      createNewAnswer(""),
    ]),
  });
}

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

  handleChange = (name, editor, pollkey) => event => {
    this.setState({ [name]: event.target.value });
    if (event.target.value === "feedback") {
      editor.replaceNodeByKey(pollkey, getFeedbackTemplate());
    } else if (event.target.value === "rate") {
      editor.replaceNodeByKey(pollkey, getGradeMeTemplate());
    } else if (event.target.value === "empty") {
      editor.replaceNodeByKey(pollkey, getEmptyTemplate());
    }
  };

  render() {
    const { classes, editor, pollkey } = this.props;

    const name = `dropdown-template-${pollkey}`;
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
            onChange={this.handleChange("template", editor, pollkey)}
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
