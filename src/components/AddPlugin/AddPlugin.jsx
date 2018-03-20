import React, { Component } from 'react';

import {
    Modal,
    MenuItem
} from "./../UI";

import {
    FabButton,
} from "./../UI/Button";

import styles from "./styles.scss";

class AddPlugin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }
    }

    shouldComponentUpdate(_, nextState) {
        return this.state.open !== nextState.open; 
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
