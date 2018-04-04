import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import common from './../common.scss';

const FabButton = props => {
    const { children, className, ...params } = props;

    return (
        <button {...params} className={`${styles.fab_button} ${common.btn} ${className}`}>
            { children }
        </button>
    )
}

FabButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default FabButton;