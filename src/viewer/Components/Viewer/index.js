import React, { Component } from "react";
import PropTypes from "prop-types";

import PluginResolver from "edtrio/common/Components/PluginResolver/Viewer";

import { Paper } from "edtrio/UI";

import styles from "./styles.scss";

const exampleData = {
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

class PluginWrapper extends Component {
    constructor (props) {
        super(props);
        console.log(this.props.data)
        this.state = {
            viewTree: [],
            data: (this.props.data.plugin ? this.props.data : exampleData)
        }

        const { data } = this.state;
        Object.keys(data.plugin.lookup).forEach((el, i) => {
            const plugin = data.plugin.lookup[el];

            plugin.childs = plugin.childs.map(
              child => data.plugin.lookup[child] || {}
            );

            if (plugin.parent === null) {
              this.state.viewTree.push(plugin);
            }
        });
    }

    render() {
        return (
            <div className={styles.viewer}>
                <Paper className={styles.paperPadding}>
                    {this.state.viewTree.map(({ name, id, content, childs }) => (
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

    static propTypes = {
        data: PropTypes.object.isRequired
    };
}

export default PluginWrapper;
