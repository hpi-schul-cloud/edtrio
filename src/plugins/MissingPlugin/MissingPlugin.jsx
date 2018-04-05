import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import styles from "./styles.scss";

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

    static propTypes = {
        type: PropTypes.string.isRequired,
    }
}

export default MissingPlugin;
