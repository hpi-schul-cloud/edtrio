import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

import { Button, ButtonIcon } from "rmwc/Button";

const ValidatorButton = props => {
    const { valid, onClick } = props;

    let validatorButtonInnerIcon;
    let validatorButtonInnerText;
    let validatorButtonColorClass = "";
    if (valid === null) {
        validatorButtonInnerText = "Validate";
        validatorButtonColorClass = styles.normal;
    } else if (valid) {
        validatorButtonInnerIcon = <ButtonIcon use="done" />;
        validatorButtonInnerText = "Correct";
        validatorButtonColorClass = styles.correct;
    } else {
        validatorButtonInnerIcon = <ButtonIcon use="error" />;
        validatorButtonInnerText = "Wrong";
        validatorButtonColorClass = styles.wrong;
    }

    return (
        <Button
            className={[styles.validate_button, validatorButtonColorClass].join(
                " "
            )}
            raised
            onClick={onClick}
        >
            {validatorButtonInnerIcon}
            {validatorButtonInnerText}
        </Button>
    );
};

ValidatorButton.propTypes = {
    valid: PropTypes.boolean,
    onClick: PropTypes.func
};

export default ValidatorButton;
