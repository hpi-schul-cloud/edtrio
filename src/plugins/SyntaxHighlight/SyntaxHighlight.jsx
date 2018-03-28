import React, { Component } from "react";
import styles from "./styles.scss";

class SyntaxHighlight extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hljs: null
        };
    }

    componentWillMount() {
        import("highlight.js").then(hljs => {
            this.setState({
                hljs,
            });
        });
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default SyntaxHighlight;