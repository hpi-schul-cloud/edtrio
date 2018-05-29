import React, { Component } from "react";
import PropTypes from "prop-types";

import PluginResolver from "edtrio/common/Components/PluginResolver/Viewer";

import { Paper } from "edtrio/UI";

import styles from "./styles.scss";

const plugin_content = {
    plugin: {
        active: "",
        lookup: {
            "1": {
                id: 1,
                name: "Text",
                content: {
                    text:
                        "<h1>Arbeitsblatt Numero 1</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p><br></p><h2>Impressionen aus dem Bachelorprojekt</h2>"
                },
                childs: [],
                parent: null,
                type: "CONTENT",
                slot: 1,
                options: {
                    allowChildRearrangement: true
                }
            },
            "2": {
                id: 2,
                name: "Bild",
                content: {
                    embedURL:
                        "http://www.pnn.de/fm/61/thumbnails/heprodimagesfotos97320180127MEINEL_1108_1_20180126154541112.jpg.7566877.jpg"
                },
                childs: [],
                parent: 3,
                type: "CONTENT",
                slot: 0,
                options: {
                    allowChildRearrangement: true
                }
            },
            "3": {
                id: 3,
                name: "Zwei Spalten",
                content: null,
                childs: [2, 4],
                parent: null,
                type: "LAYOUT",
                slot: 3,
                options: {
                    allowChildRearrangement: false
                }
            },
            "4": {
                id: 4,
                name: "Bild",
                content: {
                    embedURL:
                        "https://pbs.twimg.com/profile_images/932957476164722689/1UDelsEf_400x400.jpg"
                },
                childs: [],
                parent: 3,
                type: "CONTENT",
                slot: 1,
                options: {
                    allowChildRearrangement: true
                }
            },
            "5": {
                id: 5,
                name: "Text",
                content: {
                    text: "<br /><h2>Witzige Videos und mehr</h2>"
                },
                childs: [],
                parent: null,
                type: "CONTENT",
                slot: 1,
                options: {
                    allowChildRearrangement: true
                }
            },
            "6": {
                id: 6,
                name: "Video",
                content: {
                    embedURL: "https://www.youtube.com/embed/KaVN7gs7PFE"
                },
                childs: [],
                parent: null,
                type: "CONTENT",
                slot: 1,
                options: {
                    allowChildRearrangement: true
                }
            }
        }
    },
    mode: "easy",
    env: "development",
    doc: {
        title: ""
    }
};

/*
const plugin_content = {
    plugin: {
        active: "",
        lookup: {
            "1": {
                id: 1,
                name: "Multiple Choice",
                content: {
                    active: 4,
                    question:
                        "Spieglein, Spieglein an der Wand, Wer sind die Schönsten im ganzen Land?",
                    choices: {
                        "1": {
                            label: "Raoul"
                        },
                        "2": {
                            label: "Jan"
                        },
                        "3": {
                            label: "Das Schaf"
                        },
                        "4": {
                            label: "Raoul hat keine Beine"
                        }
                    },
                    solution: [4, 3]
                },
                childs: [],
                parent: null,
                type: "INPUT",
                slot: 1,
                options: {
                    allowChildRearrangement: true
                }
            }
        }
    },
    mode: "easy",
    env: "development",
    doc: {
        title: ""
    }
};

*/

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
                <Paper className={styles.paperPadding}>
                    {view_tree.map(({ name, id, content, childs }) => (
                        <PluginResolver plugin={name} key={id}>
                            {Module => (
                                <div className={styles.inner}>
                                    <Module
                                        content={content}
                                        id={id}
                                        childs={childs}
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
