import React, { Component } from "react";

import styles from "./styles.scss";

export default function makePlugin(WrappedComponent, info) {
    return class ViewComponent extends Component {
        shouldComponentUpdate() {
            return false;
        }

        render() {
            return (
                <div className={styles.wrapper}>
                    <WrappedComponent {...this.props} isViewMode={true}/>
                </div>);
        }
    };
}
