import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Paper = props => {
    const { children, className, ...params } = props;

    return (
        <div {...params} className={`${styles.paper} ${className}`}>
            { children }
        </div>
    )
}

Paper.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export default Paper;