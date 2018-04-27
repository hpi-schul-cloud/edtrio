import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';


class PluginPreview extends Component {
    render() {
        const { name, description, image } = this.props;

        return (
            <figure>
                <img src={image}/>
                <figcaption className={styles.title}>{name}</figcaption>
            </figure>
        )
    }
}

PluginPreview.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.any.isRequired,
}

export default PluginPreview