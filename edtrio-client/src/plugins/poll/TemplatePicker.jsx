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
import { createNewPollAnswer } from "./Poll";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    minWidth: 200,
  },
});

async function getFeedbackTemplate(pollId) {
  return Block.create({
    type: "poll",
    data: { id: pollId },
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([
          Text.create("Was hat dir in der heutigen Stunde am meisten gefehlt?"),
        ]),
      }),
      await createNewPollAnswer(pollId, "Nichts! Ich bin zufrieden"),
      await createNewPollAnswer(
        pollId,
        "Zeit. Ich hätte gerne mehr Zeit gehabt",
      ),
      await createNewPollAnswer(
        pollId,
        "Erklärung. Ich habe kaum etwas verstanden",
      ),
      await createNewPollAnswer(
        pollId,
        "Vielfalt. Irgendwie war es langweilig heute",
      ),
      await createNewPollAnswer(pollId, "Ruhe. Es war viel zu laut"),
      await createNewPollAnswer(
        pollId,
        "Feedback. Ich brauche mehr Rückmeldung zu meiner Arbeit",
      ),
    ]),
  });
}
async function getGradeMeTemplate(pollId) {
  return Block.create({
    type: "poll",
    data: { id: pollId },
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([
          Text.create("Wie würdest du die Stunde in Schulnoten bewerten?"),
        ]),
      }),
      await createNewPollAnswer(pollId, "1"),
      await createNewPollAnswer(pollId, "2"),
      await createNewPollAnswer(pollId, "3"),
      await createNewPollAnswer(pollId, "4"),
      await createNewPollAnswer(pollId, "5"),
      await createNewPollAnswer(pollId, "6"),
    ]),
  });
}

async function getEmptyTemplate(pollId) {
  return Block.create({
    type: "poll",
    data: { id: pollId },
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([Text.create("")]),
      }),
      await createNewPollAnswer(pollId, ""),
      await createNewPollAnswer(pollId, ""),
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

  handleChange = (name, editor, poll) => event => {
    this.setState({ [name]: event.target.value });
    const pollId = poll.data.get("id");
    let templatePromise;
    if (event.target.value === "feedback") {
      templatePromise = getFeedbackTemplate(pollId);
    }
    if (event.target.value === "rate") {
      templatePromise = getGradeMeTemplate(pollId);
    }
    if (event.target.value === "empty") {
      templatePromise = getEmptyTemplate(pollId);
    }
    templatePromise.then(template =>
      editor.replaceNodeByKey(poll.key, template),
    );
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
            onChange={this.handleChange("template", editor, poll)}
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
