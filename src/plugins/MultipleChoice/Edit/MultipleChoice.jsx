import React, { Component } from "react";
import PropTypes from "prop-types";

import has from "has";

import styles from "./../styles.scss";

import { Checkbox } from "rmwc/Checkbox";
import { TextField } from "rmwc/TextField";
import { Infobox } from "edtrio/UI";


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
                {Object.entries(choices).map(([id, { label }]) => {
                    const labelIsEditable = active === +id && isEditable;

                    return (
                        <div
                            key={id}
                            className={
                                !labelIsEditable ? styles.checkbox_wrapper : ""
                            }
                        >
                            <Checkbox
                                onClick={e => this.toggleChoice(e, +id)}
                                tabIndex={-1}
                            />
                            {labelIsEditable ? (
                                <TextField
                                    onKeyDown={e => this.nextChoice(e)}
                                    onInput={e =>
                                        this.setChoice(e.target.value)
                                    }
                                    value={label}
                                    label={`Option ${id}`}
                                    tabIndex={0}
                                    autoFocus
                                />
                            ) : (
                                <label
                                    onClick={() =>
                                        this.setState({
                                            active: +id
                                        })
                                    }
                                    tabIndex={0}
                                    style={{ cursor: "text" }}
                                    onFocus={() =>
                                        this.setState({
                                            active: +id
                                        })
                                    }
                                >
                                    {label || `Option ${id}`}
                                </label>
                            )}
                        </div>
                    );
                })}

                {isEditable ? (
                    <>
                        <div className={styles.checkbox_wrapper}>
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
