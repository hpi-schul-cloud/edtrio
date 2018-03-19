import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import makePlugin from './../../PluginWrapper';

import styles from "./styles.scss";
import info from "./plugin.json";

/**
 * MissingPlugin to be displayed when no plugin could be
 * resolved by Editor:_resolvePlugin
 * Is not intended to appear in production and likely
 * hints that an error has been made.
 */
class MissingPlugin extends PureComponent {
    render() {
        const { type } = this.props

        return (
            <div className={styles.wrapper}>
                <h1>The plugin <code className={styles.code}>{type}</code> is missing!</h1>
                <p>This is likely caused by an incorrect import in Editor.js</p>
            </div>
        )
    }

    static defaultProps = {
        PluginName: "Missing Plugin",
    }
}

export default makePlugin(MissingPlugin, info)
