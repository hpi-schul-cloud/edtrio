import React, { PureComponent } from 'react';

import {
    Modal,
    MenuItem
} from "x-editor//UI";

import {
    FabButton,
} from "x-editor/UI/Button";

import styles from "./styles.scss";

class AddPlugin extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }
    }

    handleOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    }

    render() {
        const { allPlugins } = this.props;

        return (
            <React.Fragment>
                <Modal
                    title="Add element"
                    open={this.state.open}
                    onClose={() => this.handleClose()}>
                    { <div>
                        { allPlugins.map(({ info }) => {
                            return (
                            <MenuItem
                                key={info.name}
                                onClick={e => {
                                    this.handleClose()
                                    this.props.addPlugin(info)
                                }} >{info.name} - {info.description}</MenuItem>)
                            })
                        }
                    </div>
                    }
                </Modal>
                
                <FabButton
                    className={styles.floating_button}
                    onClick={() => this.handleOpen()}>
                    <p>hi</p>
                </FabButton>
            </React.Fragment>
        )
    }

    static propTypes = {
        
    }
}

export default AddPlugin
