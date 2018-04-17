import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";

import { Collapsible, Modal, MenuItem, PluginPreview } from "edtrio/UI";

import { FabButton } from "edtrio/UI/Button";

import PluginResolver from "edtrio/common/Components/PluginResolver";
import styles from "./styles.scss";

class AddPlugin extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            openCollapsible: 0
        };

        this.plugins = [
            {
                name: "Inhaltselemente",
                plugins: PluginResolver.allPlugins
                    .map(({ info }) => info)
                    .filter(info => info.type === "CONTENT")
            },
            {
                name: "Layout",
                plugins: PluginResolver.allPlugins
                    .map(({ info }) => info)
                    .filter(info => info.type === "LAYOUT")
            }
        ];
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                >
                    {this.plugins.map(({ name, plugins }, i) => (
                        <Collapsible
                            title={name}
                            isExpanded={i === 0}
                            key={name}
                        >
                            <div className={styles.container}>
                                {plugins.map(info => (
                                    <MenuItem
                                        key={info.name}
                                        onClick={e => {
                                            this.handleClose();
                                            this.props.addPlugin(info);
                                        }}
                                    >
                                        <PluginPreview
                                            name={info.name}
                                            description={info.description}
                                        />
                                    </MenuItem>
                                ))}
                            </div>
                        </Collapsible>
                    ))}
                </Modal>

                <FabButton
                    className={styles.floating_button}
                    onClick={() => this.handleOpen()}
                >
                    <i className="material-icons">add</i>
                </FabButton>
            </React.Fragment>
        );
    }

    static propTypes = {
        addPlugin: PropTypes.func.isRequired
    };

    static displayName = "AddPlugin Button";
}

export default AddPlugin;
