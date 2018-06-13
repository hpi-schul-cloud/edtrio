import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";

import { Modal, MenuItem, PluginPreview } from "edtrio/UI";

import { Fab } from "rmwc/Fab";

import PluginResolver from "edtrio/common/Components/PluginResolver/Editor";

import styles from "./styles.scss";

import Plugin from "edtrio/models/Plugin";

class AddPlugin extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        };

        this.types = Object.keys(Plugin.TYPES).reduce(
            (acc, pl) => ({
                ...acc,
                [pl.toLocaleLowerCase()]: PluginResolver.allPlugins.reduce(
                    (acc, info) => {
                        if (info.type !== pl) {
                            return acc;
                        }

                        if (info.multi) {
                            return [
                                ...acc,
                                ...info.multi.map(item => ({
                                    ...item,
                                    preview_image: info.preview_image,
                                    name: info.name
                                }))
                            ];
                        }

                        return [...acc, info];
                    },
                    []
                )
            }),
            {}
        );
    }

    renderMenuItem = (info, key) => (
        <div key={key} className={styles.item}>
            <MenuItem
                key={info.name}
                onClick={e => {
                    this.handleClose();
                    this.props.addPlugin(info);
                }}
            >
                <PluginPreview
                    name={info.name}
                    displayName={info.displayName}
                    image={info.preview_image}
                    description={info.description}
                />
            </MenuItem>
        </div>
    );

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        return (
            <>
                <Modal
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                >
                    <>
                        <div className={styles.title}>Add element</div>

                        {Object.entries(this.types).map(([key, val]) => (
                            <div key={key}>
                                <div className={styles.title_block}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </div>
                                <div className={styles.container}>
                                    {val.map((item, j) =>
                                        this.renderMenuItem(item, j)
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                </Modal>

                <Fab
                    className={styles.floating_button}
                    onClick={() => this.handleOpen()}
                >
                    add
                </Fab>
            </>
        );
    }

    static propTypes = {
        addPlugin: PropTypes.func.isRequired
    };

    static displayName = "AddPlugin Button";
}

export default AddPlugin;
