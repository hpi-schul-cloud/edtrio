import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";

import { Modal, MenuItem } from "edtrio/UI";

import { FabButton } from "edtrio/UI/Button";

import PluginResolver from "edtrio/common/Components/PluginResolver";
import styles from "./styles.scss";

class AddPlugin extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
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
                    {
                        <div>
                            {PluginResolver.allPlugins.map(({ info }) => {
                                return (
                                    <MenuItem
                                        key={info.name}
                                        onClick={e => {
                                            this.handleClose();
                                            this.props.addPlugin(info);
                                        }}
                                    >
                                        {info.name} - {info.description}
                                    </MenuItem>
                                );
                            })}
                        </div>
                    }
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
