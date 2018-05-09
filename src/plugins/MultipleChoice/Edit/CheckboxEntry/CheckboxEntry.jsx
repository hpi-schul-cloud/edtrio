import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

import { Checkbox } from "rmwc/Checkbox";
import { TextField } from "rmwc/TextField";
import { Icon } from "rmwc/Icon";

class CheckboxEntry extends Component {
    render() {
        const {
            labelIsEditable,
            toggleChoice,
            nextChoice,
            setChoice,
            label,
            id,
            deleteChoice,
            isEditable,
            activateEntry
        } = this.props;

        return (
            <div
                className={
                    !labelIsEditable
                        ? styles.checkbox_wrapper
                        : styles.checkbox_wrapperli
                }
            >
                <Checkbox onClick={e => toggleChoice(e, +id)} tabIndex={-1} />
                {labelIsEditable ? (
                    <TextField
                        rootProps={{ style: { width: "100%" } }}
                        onKeyDown={e => nextChoice(e)}
                        onInput={e => setChoice(e.target.value)}
                        value={label}
                        label={`Option ${id}`}
                        tabIndex={0}
                        autoFocus
                    />
                ) : (
                    <label
                        onClick={() => activateEntry(+id)}
                        onFocus={() => activateEntry(+id)}
                        tabIndex={0}
                        className={styles.checkbox_label}
                    >
                        {label || `Option ${id}`}
                    </label>
                )}
                {isEditable ? (
                    <Icon
                        onClick={() => deleteChoice(+id)}
                        className={styles.removeButton}
                    >
                        clear
                    </Icon>
                ) : null}
            </div>
        );
    }
}

CheckboxEntry.propTypes = {
    labelIsEditable: PropTypes.bool,
    isEditable: PropTypes.bool,
    activateEntry: PropTypes.func,
    toggleChoice: PropTypes.func,
    nextChoice: PropTypes.func,
    setChoice: PropTypes.func,
    deleteChoice: PropTypes.func,
    label: PropTypes.string,
    id: PropTypes.number
};

export default CheckboxEntry;
