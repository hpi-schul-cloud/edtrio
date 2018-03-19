import React, { PureComponent } from "react";
import PropTypes from 'prop-types'

import styles from "./styles.scss";

const effect = {
    disabled: styles.disabled,
};

export default class MenuItem extends PureComponent {

    render() {
        const {
            children,
            ...props
        } = this.props;

        const effects = Object.keys(this.props)
                              .reduce((acc, key) => `${acc} ${effect[key] || ""}`, "");

        return (
            <div {...props} 
                className={`${styles.item} ${effects}`} >
                { children }
            </div>
        )
    }

    static propTypes = {
        disabled: false,
    }

    static propTypes = {
        disabled: PropTypes.bool,
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
    }
}