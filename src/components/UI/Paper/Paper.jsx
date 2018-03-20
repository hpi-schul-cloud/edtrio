import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import styles from "./styles.scss";

export default class Paper extends PureComponent {

    render() {

        const { 
            children,
            ...props 
        } = this.props;

        return (
            <div {...props} className={styles.paper}>
                { children }
            </div>
        )
    }

    static propTypes = {
        children: PropTypes.node,
    }
}