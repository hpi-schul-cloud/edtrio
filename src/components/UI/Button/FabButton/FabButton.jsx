import React, { Component } from "react";

import styles from "./styles.scss";
import common from "./../common.scss";

export default class FabButton extends Component {
    
    render() {
        const { children, className, ...props } = this.props;

        return (
            <button {...props} className={`${styles.fab_button} ${common.btn} ${className}`}>
                { children }
            </button>
        )
    }
}