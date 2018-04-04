import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export default class AppBar extends PureComponent {

    render() {
        
        return (
            <header className={styles.app_bar}>
                <div className={styles.app_bar_content}>
                    <h2>{this.props.title}</h2>
                </div>
            </header>
        )
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
    }
}