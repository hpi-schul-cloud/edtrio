import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

import { Icon } from "rmwc/Icon";

const Infobox = ({ children }) => {
    return (
        <div className={styles.infobox}>
            <Icon>info_outline</Icon>
            {children}
        </div>
    );
};

Infobox.propTypes = {
    children: PropTypes.node.isRequired
};

export default Infobox;
