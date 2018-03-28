import React from "react";

import styles from "./styles.scss";
import common from "./../common.scss";

const FabButton = props => {
    const { children, className, ...params } = props;

    return (
        <button {...params} className={`${styles.fab_button} ${common.btn} ${className}`}>
            { children }
        </button>
    )
}

export default FabButton;