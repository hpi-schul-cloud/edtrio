import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import has from "has";

import styles from "./../styles.scss";

import { Checkbox } from "rmwc/Checkbox";
import { TextField } from "rmwc/TextField";
import { Button, ButtonIcon } from "rmwc/Button";

class MultipleChoice extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            valid: null,
            userChoice: []
        };
    }

    validate() {
        this.setState({
            valid:
                this.props.content.solution.every(solution =>
                    this.state.userChoice.includes(solution)
                ) &&
                this.props.content.solution.length ===
                    this.state.userChoice.length
        });
    }

    toggleChoice(id) {
        this.setState({valid: null}); //reset Validator button

        const index = this.state.userChoice.findIndex(e => e === id);

        let choices = [...this.state.userChoice];
        if (index > -1) {
            choices = this.state.userChoice.filter(i => i !== id);
        } else {
            choices.push(id);
        }

        this.setState({
            userChoice: choices
        });
    }

    render() {
        const { question, choices, solution } = this.props.content;
        const { valid } = this.state;

        let validatorButtonInnerIcon;
        let validatorButtonInnerText;
        let validatorButtonColorClass = '';
        if(valid === null) {
            validatorButtonInnerText = "Validate";
        } else if(valid) {
            validatorButtonInnerIcon = (<ButtonIcon use="done" />)
            validatorButtonInnerText = "Correct"
            validatorButtonColorClass = styles.correct;
        } else {
            validatorButtonInnerIcon = (<ButtonIcon use="error" />)
            validatorButtonInnerText = "Wrong";
            validatorButtonColorClass = styles.wrong;
        }

        return <>
                <p className={styles.question}>{question}</p>
                {Object.entries(choices)
                    .filter(([_, { label }]) => label.length > 0)
                    .map(([id, { label }]) => <div key={id}>
                            <Checkbox
                                onClick={() => this.toggleChoice(+id)}
                            >
                                {label}
                            </Checkbox>
                        </div>)}
                <Button className={[styles.validate_button, validatorButtonColorClass].join(' ')} raised onClick={() => this.validate()}>
                    {validatorButtonInnerIcon}
                    {validatorButtonInnerText}
                </Button>
            </>;
    }

    static propTypes = {
        content: PropTypes.object.isRequired
    };
}

export default MultipleChoice;
