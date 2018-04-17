import React, { Component } from "react";
import PropTypes from "prop-types";

import PluginResolver from "edtrio/common/Components/PluginResolver";

import styles from "./styles.scss";

const content = {
    plugin: {
        active: 3,
        lookup: {
            "1": {
                id: 1,
                name: "Layout Plugin",
                content: null,
                childs: [3, null],
                parent: null,
                type: "LAYOUT",
                slot: 1,
                options: { allowChildRearrangement: false }
            },
            "2": {
                id: 2,
                name: "Horizontal Line Plugin",
                content: null,
                childs: [],
                parent: null,
                type: "CONTENT",
                slot: 2,
                options: { allowChildRearrangement: true }
            },
            "3": {
                id: 3,
                name: "Dummy Plugin",
                content: null,
                childs: [],
                parent: 1,
                type: "CONTENT",
                slot: 0,
                options: { allowChildRearrangement: true }
            },
            "4": {
                id: 4,
                name: "Dummy Plugin",
                content: null,
                childs: [],
                parent: null,
                type: "CONTENT",
                slot: 4,
                options: { allowChildRearrangement: true }
            }
        }
    },
    mode: "easy",
    env: "development",
    doc: { title: "" }
};

class PluginWrapper extends Component {
    render() {
        return Object.values(content.plugin.lookup).map(
            ({ name, id, content }) => {
                return (
                    <PluginResolver plugin={name} key={id}>
                        {Module => <Module content={content} />}
                    </PluginResolver>
                );
            }
        );
    }
}

export default PluginWrapper;
