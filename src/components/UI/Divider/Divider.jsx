import React, { Component } from "react";

import styles from "./styles.scss";

export default class Divider extends Component {

    shouldUpdateComponent() {
        return false;
    }

    render() {

        return (
            <div className={styles.divider}></div>
        )
    }
}