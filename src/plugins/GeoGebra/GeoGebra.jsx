import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

//jaz8F8hZ

export default class Geogebra extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            geogebra: null
        };

        this.applet = React.createRef();
    }

    renderApplet(id) {
        this.setState(state => {
            const app = new this.state.geogebra(
                {
                    material_id: id,
                    width: this.applet.current.offsetWidth,
                    height: 500
                },
                true
            );

            app.inject("ggb-element");

            return {
                ...state,
                id
            };
        });
    }

    componentDidMount() {
        import("./gg.js").then(GeoGebra => {
            this.setState(state => ({
                ...state,
                geogebra: GeoGebra.default
            }));
        });
    }

    render() {
        const { id } = this.state;

        return (
            <>
                <div id="ggb-element" ref={this.applet} />

                <div>
                    <input
                        className={styles.id_input}
                        onInput={e => this.renderApplet(e.target.value)}
                        type="text"
                        placeholder="GeoGebra Id"
                    />
                </div>
            </>
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired
    };
}
