import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

const AppBar = ({ title }) => (
    <header className={styles.app_bar}>
        <div className={styles.app_bar_content}>
            <h2>{title}</h2>
        </div>
    </header>
);

AppBar.propTypes = {
    title: PropTypes.string.isRequired
};

export default AppBar;
