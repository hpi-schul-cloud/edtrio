import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";

import {
    Collapsible,
    Modal,
    MenuItem,
    PluginPreview,
} from 'edtrio/UI';

import {
    FabButton,
} from 'edtrio/UI/Button';

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
        const content = [];
        const layout = [];

        return (
            <React.Fragment>
                <Modal
                    open={this.state.open}
                    onClose={() => this.handleClose()}>
                    <React.Fragment>
                        {PluginResolver.allPlugins.map(( info ) => {
                            const temp = (
                                <div key={info.name} className={styles.item}>
                                    <MenuItem
                                        key={info.name}
                                        onClick={e => {
                                            this.handleClose()
                                            this.props.addPlugin(info)
                                        }}>
                                        <PluginPreview
                                            name={info.name}
                                            description={info.description} />
                                    </MenuItem>
                                </div>)
                            
                            if(info.type === 'CONTENT') {
                                content.push(temp)
                            } else {
                                layout.push(temp)
                            }
                        })}

                        <Collapsible
                            title="Inhaltselemente"
                            isExpanded={true}>
                            <div className={styles.container}>
                                {content}
                            </div>
                        </Collapsible>
                        <Collapsible title="Layout">
                            <div className={styles.container}>
                                {layout}
                            </div>
                        </Collapsible>
                    </React.Fragment>
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
