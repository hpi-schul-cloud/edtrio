import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { List } from "immutable";
import { Block, Editor, Node, Text } from "slate";
import { PassThrough } from "stream";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
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
        nodes: List([Text.create("Was kann ich besser machen?")]),
      }),
      Block.create({
        type: "poll_answergroup",
        data: { selected_answer: -1 },
        nodes: List([
          createNewAnswer("Mehr Zeit"),
          createNewAnswer("Mehr Infos"),
        ]),
      }),
    ]),
  });
}
function getBTemplate() {
  return Block.create({
    type: "poll",
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([Text.create("Wie würdest du die Stunde bewerten?")]),
      }),
      Block.create({
        type: "poll_answergroup",
        data: { selected_answer: -1 },
        nodes: List([
          createNewAnswer("1"),
          createNewAnswer("2"),
          createNewAnswer("3"),
          createNewAnswer("4"),
          createNewAnswer("5"),
          createNewAnswer("6"),
        ]),
      }),
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
      Block.create({
        type: "poll_answergroup",
        data: { selected_answer: -1 },
        nodes: List([createNewAnswer(""), createNewAnswer("")]),
      }),
    ]),
  });
}

class NativeSelects extends React.Component {
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
    } else if (event.target.value === "bewert") {
      editor.replaceNodeByKey(pollkey, getBTemplate());
    } else if (event.target.value === "empty") {
      editor.replaceNodeByKey(pollkey, getEmptyTemplate());
    }
  };

  render() {
    const { classes, parent, editor, pollkey } = this.props;

    const name = `dropdown-template-${parent.key}`;
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
            <option value="bewert">Bewertung</option>
          </Select>
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);
