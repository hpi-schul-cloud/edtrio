import React, { Component } from "react";

import styles from "./styles.scss";

export default function makePlugin(WrappedComponent, info) {
    return class ViewComponent extends Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}
