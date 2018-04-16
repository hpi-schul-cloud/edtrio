import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';


class PluginPreview extends Component {
    render() {
        const { name, description } = this.props;

        return (
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.previewImage}`}>

                </div>
                <div className={`${styles.content}`}>
                    <div className={`${styles.title}`}>
                        {name}
                    </div>
                    <div className={`${styles.description}`}>
                        {description.substr(0, 50)}
                    </div>
                </div>
            </div>
        )
    }
}

PluginPreview.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
}

export default PluginPreview