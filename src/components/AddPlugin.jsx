import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'


class AddPlugin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }
    
    render() {
        const { allPlugins } = this.props
        let plugins = []
        for (let pluginName in allPlugins) {
            plugins.push(
                <MenuItem
                    primaryText={pluginName}
                    key={pluginName}
                    onClick={e => {
                        this.handleClose()
                        this.props.addPlugin(pluginName)
                    }} />)
        }

        return (
            <React.Fragment>
                <Dialog
                    title="Add element"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    <Menu>
                        {plugins}
                    </Menu>
                </Dialog>
                <FloatingActionButton
                    style={{
                        margin: 0,
                        top: 'auto',
                        right: 20,
                        bottom: 20,
                        left: 'auto',
                        position: 'fixed'
                    }}
                    onClick={this.handleOpen}>
                    <ContentAdd />
                </FloatingActionButton>
            </React.Fragment>
        )
    }
}

export default AddPlugin
