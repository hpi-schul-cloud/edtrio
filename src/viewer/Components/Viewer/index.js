import React, { Component } from "react";
import PropTypes from "prop-types";

import PluginResolver from "edtrio/common/Components/PluginResolver";

import { Paper } from "edtrio/UI";

import styles from "./styles.scss";

const plugin_content = {
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

const view_tree = [];
Object.keys(plugin_content.plugin.lookup).forEach((el, i) => {
    const cur = plugin_content.plugin.lookup[el];

    cur.childs = cur.childs.map(
        child => plugin_content.plugin.lookup[child] || {}
    );

    if (cur.parent === null) {
        view_tree.push(cur);
    }
});

class PluginWrapper extends Component {
    render() {
        return (
            <div className={styles.viewer}>
                <Paper>
                    {view_tree.map(({ name, id, content, childs }) => (
                        <PluginResolver plugin={name} key={id} mode="view">
                            {Module => (
                                <div className={styles.inner}>
                                    <Module
                                        content={content}
                                        id={id}
                                        childs={childs}
                                        isEditable={false}
                                    />
                                </div>
                            )}
                        </PluginResolver>
                    ))}
                </Paper>
            </div>
        );
    }
}

export default PluginWrapper;
