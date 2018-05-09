import React, { Component } from "react";
import PropTypes from "prop-types";

import has from "has";

import styles from "./../styles.scss";
import checkbox_styles from "./CheckboxEntry/styles.scss";

import { TextField } from "rmwc/TextField";
import { Checkbox } from "rmwc/Checkbox";
import { Infobox } from "edtrio/UI";

import CheckboxEntry from "./CheckboxEntry";

class MultipleChoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0,
            question: "",
            choices: {
                1: {
                    label: ""
                }
            },
            solution: []
        };
    }

    //TODO
    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
        });
    }

    handleQuestionChange(value) {
        this.setState({ question: value });
    }

    toggleChoice(e, id) {
        const index = this.state.solution.findIndex(i => i === id);

        let solution = [...this.state.solution];
        if (index > -1) {
            solution = this.state.solution.filter(i => i !== id);
        } else {
            solution.push(id);
        }

        this.setState(
            {
                solution
            },
            () => this.props.saveContent(this.state)
        );
    }

    setChoice(value) {
        this.setState(
            {
                choices: {
                    ...this.state.choices,
                    [this.state.active]: {
                        label: value
                    }
                }
            },
            () => this.props.saveContent(this.state)
        );
    }

    activateEntry(id) {
        this.setState({
            active: id
        });
    }

    /**
     * Delete a choice option from the state
     * @param {*} id which choice
     */
    deleteChoice(id) {
        const deleteableChoices = this.state.choices;
        delete deleteableChoices[id];

        this.setState(
            {
                choices: {
                    ...deleteableChoices
                }
            },
            () => this.props.saveContent(this.state)
        );
    }

    /**
     * Jump to the next choice option (or append a new one)
     * @param {*} e event that was fired
     */
    nextChoice(e) {
        if (e.keyCode && e.keyCode !== 13) {
            return;
        }

        const nextOption = this.state.active + 1;
        this.setState({
            active: nextOption,
            choices: {
                ...this.state.choices,
                [nextOption]: {
                    label: ""
                }
            }
        });
    }

    render() {
        const { choices, active } = this.state;
        const { isEditable } = this.props;

        return (
            <>
                <TextField
                    fullwidth
                    autoFocus
                    placeholder="Untitled Question"
                    value={this.state.question}
                    onKeyDown={e => this.nextChoice(e)}
                    tabIndex={0}
                    onChange={e => this.handleQuestionChange(e.target.value)}
                    className={styles.question}
                />
                {Object.entries(choices).map(([id, { label }]) => (
                    <CheckboxEntry
                        key={id}
                        id={+id}
                        labelIsEditable={active === +id && isEditable}
                        toggleChoice={this.toggleChoice.bind(this)}
                        nextChoice={this.nextChoice.bind(this)}
                        setChoice={this.setChoice.bind(this)}
                        deleteChoice={this.deleteChoice.bind(this)}
                        activateEntry={this.activateEntry.bind(this)}
                        label={label}
                        isEditable={isEditable}
                    />
                ))}

                {isEditable ? (
                    <>
                        <div className={checkbox_styles.checkbox_wrapper}>
                            <Checkbox disabled />
                            <label onClick={e => this.nextChoice(e)}>
                                {
                                    <div className={styles.addOption}>
                                        Add Option
                                    </div>
                                }
                            </label>
                        </div>
                        <Infobox>
                            Don&apos;t forget to check the boxes next to the
                            correct answer
                        </Infobox>
                    </>
                ) : null}
            </>
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired
    };
}

export default MultipleChoice;
