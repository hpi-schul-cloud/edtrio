import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';


class PluginPreview extends Component {
    render() {
        const { name, description } = this.props;

        return (
            <figure>
                <img src="https://goo.gl/cScsnX"/>
                <figcaption className={styles.title}>{name}</figcaption>
            </figure>
        )
    }
}

PluginPreview.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
}

export default PluginPreview