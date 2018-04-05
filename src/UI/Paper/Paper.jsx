import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Paper = props => {
    const { children, ...params } = props;

    return (
        <div {...params} className={styles.paper}>
            { children }
        </div>
    )
}

Paper.propTypes = {
    children: PropTypes.node,
}

export default Paper;