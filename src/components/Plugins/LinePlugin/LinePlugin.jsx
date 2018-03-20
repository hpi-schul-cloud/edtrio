import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import makePlugin from './../../PluginWrapper';

import styles from "./styles.scss";
import info from "./plugin";

class HorizontalLine extends PureComponent {
    
    render() {

        return (
            <div className={styles.line}></div>
        )
    }
}

export default makePlugin(HorizontalLine, info);