import React, { Component } from "react";
import PropTypes from "prop-types";

import has from "has";

import styles from "./styles.scss";

class MultipleChoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 1,
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

    toggleChoice(e, id) {
        const index = this.state.solution.findIndex(i => i === id);

        let solution = [];
        if (index > -1) {
            solution = this.state.solution.filter(i => i !== this.id);
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
        e.preventDefault();

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

        return (
            <>
                {Object.entries(choices).map(([id, { label }]) => (
                    <div key={id} className={styles.checkbox_wrapper}>
                        <input
                            type="checkbox"
                            onClick={e => this.toggleChoice(e, +id)}
                        />
                        {active === +id ? (
                            <form onSubmit={e => this.nextChoice(e)}>
                                <input
                                    type="text"
                                    autoFocus={true}
                                    value={label}
                                    placeholder="Choice"
                                    onInput={e =>
                                        this.setChoice(e.target.value)
                                    }
                                />
                            </form>
                        ) : (
                            <label
                                onClick={() =>
                                    this.setState({
                                        active: +id
                                    })
                                }
                            >
                                {label || "placeholder"}
                            </label>
                        )}
                    </div>
                ))}
            </>
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired
        //isViewMode: PropTypes.bool,
    };
}

export default MultipleChoice;
