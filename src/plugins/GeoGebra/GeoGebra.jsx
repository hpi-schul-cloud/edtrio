import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

//jaz8F8hZ

export default class Geogebra extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: ""
        };

        this.applet = React.createRef();
    }

    shouldComponentUpdate(nextProps, { id }) {
        return id !== this.state.id;
    }

    renderApplet(id) {
        this.setState(
            () => {
                return {
                    id
                };
            },
            () => this.props.saveContent(this.state)
        );
    }

    renderHTML() {
        return `<!DOCTYPE>
        <html>
        <head>
            <meta name=viewport content="width=device-width,initial-scale=1">
            <script src="https://cdn.geogebra.org/apps/deployggb.js"></script>
        </head>
        <body>
            <div id="ggb-element"></div> 

            <script>
                var ggbApp = new GGBApplet({"appName": "graphing", "material_id": "${
                    this.state.id
                }"}, true);
                window.addEventListener("load", function() { 
                    ggbApp.inject('ggb-element');
                });
            </script>
        </body>
        </html>
        `;
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
        });
    }

    render() {
        return (
            <div ref={this.applet}>
                <input
                    className={styles.id_input}
                    onInput={e => this.renderApplet(e.target.value)}
                    type="text"
                    placeholder={this.state.id || "GeoGebra Id"}
                />

                {this.state.id && (
                    <iframe
                        height="500px"
                        width="100%"
                        srcDoc={this.renderHTML()}
                    />
                )}
            </div>
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired
    };
}
