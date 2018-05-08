import React, { Component } from "react";
import PropTypes from "prop-types";

import has from "has";

import styles from "./../styles.scss";

import { Checkbox } from "rmwc/Checkbox";
import { TextField } from "rmwc/TextField";
import { Icon } from "rmwc/Icon";


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
        if (e.keyCode !== 13) {
            return;
        }

        this.setState({
            active: this.state.active + 1
        });
    }

    setChoice(value) {
        const next = {
            ...this.state.choices,
            [this.state.active]: {
                label: value
            }
        };

        if (!has(this.state.choices, this.state.active + 1)) {
            next[this.state.active + 1] = {
                label: ""
            };
        }

        this.setState(
            {
                choices: {
                    ...next
                }
            },
            () => this.props.saveContent(this.state)
        );
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
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
                                    onFocus={() =>
                                        this.setState({
                                            active: +id
                                        })}
                                >
                                    {label || `Option ${id}`}
                                </label>
                            )}
                        </div>
                    );
                })}
                {isEditable ? (<div className={styles.infobox}>
                    <Icon>info_outline</Icon><>Don't forget to check the boxes next to the correct answer</>
                </div>) : null }
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
