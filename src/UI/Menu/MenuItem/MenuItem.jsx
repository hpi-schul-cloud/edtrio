import React from 'react';
import PropTypes from 'prop-types'

import styles from './styles.scss';

const effect = {
    disabled: styles.disabled,
};

const MenuItem = props => {
    const { children, ...params } = props;

    const effects = Object.keys(params)
                        .reduce((acc, key) => `${acc} ${effect[key] || ''}`, '');

    return (
        <div {...params} 
            className={`${styles.item} ${effects}`} >
            { children }
        </div>
    )
}

MenuItem.defaultTypes = {
    disabled: false,
}

MenuItem.propTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default MenuItem;