import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";

import { Modal, MenuItem, PluginPreview } from "edtrio/UI";

import { Fab } from "rmwc/Fab";

import PluginResolver from "edtrio/common/Components/PluginResolver/Editor";

import styles from "./styles.scss";

class AddPlugin extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: true
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
      const input = [];

      const pushPlugin = info => {
        const temp = (
          <div key={info.name} className={styles.item}>
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

        if (info.type === "CONTENT") {
          content.push(temp);
        } else if (info.type === "INPUT") {
          input.push(temp);
        } else {
          layout.push(temp);
        }
      }

        return (
            <React.Fragment>
                <Modal
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                >
                    <React.Fragment>
                        {PluginResolver.allPlugins.map(info => {
                            if(info.multi) {
                              info.multi.map(plugin => {
                                plugin.preview_image = info.preview_image;
                                plugin.name = info.name;
                                pushPlugin(plugin)
                              });
                            } else {
                              pushPlugin(info);
                            }
                        })}

                        <div className={styles.title}>Add element</div>
                        <div className={styles.title_block}>Content</div>
                        <div className={styles.container}>{content}</div>
                        <div className={styles.title_block}>Layout</div>
                        <div className={styles.container}>{layout}</div>
                        <div className={styles.title_block}>Input</div>
                        <div className={styles.container}>{input}</div>
                    </React.Fragment>
                </Modal>

                <Fab
                    className={styles.floating_button}
                    onClick={() => this.handleOpen()}
                >
                    add
                </Fab>
            </React.Fragment>
        );
    }

    static propTypes = {
        addPlugin: PropTypes.func.isRequired
    };

    static displayName = "AddPlugin Button";
}

export default AddPlugin;
