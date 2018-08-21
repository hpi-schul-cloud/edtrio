import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Button from '../helpers/Button'
import Icon from '../helpers/Icon'


class PlusMenu extends Component {
    render() {
        return ReactDOM.createPortal(
            <div
                className="plus-menu"
            >
                {this.renderPlusMenuButton('file', 'attach_file', this.dealWithMaFileClick)}
            </div>,
            root
        )
    }

    renderPlusMenuButton = (type, icon, onClickButton) => {
        return (
            <Button onMouseDown={event => {
                onClickButton(event, type)
            }}>
                <Icon>{icon}</Icon>
            </Button>
        )
    }

    dealWithMaFileClick = (event, type) => {
        console.log(`CLICK ${event} ${type}`)

        const { value, onChange } = this.props
        event.preventDefault()
        const change = value.change()

        change.setBlocks(type)

        onChange(change)
    }
}

export default PlusMenu
