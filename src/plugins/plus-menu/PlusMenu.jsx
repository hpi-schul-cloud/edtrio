import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Button from '../helpers/Button'
import Icon from '../helpers/Icon'
import insertParagraph from '../helpers/insertParagraph'
import DownloadFile from '../download-file'

import './style.css'


class PlusMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            style: {}
        }
    }
    
    render() {
        const root = window.document.getElementById('root')

        return ReactDOM.createPortal(
            <div
                className="plus-menu"
                style={this.state.style}
                ref={wrapper => (this.menuWrapper = wrapper)}
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

        const { insertFile } = DownloadFile().changes

        const { value, onChange } = this.props
        event.preventDefault()
        const src = window.prompt('Enter file url thxxx')
        if(!src) return

        const change = value.change().call(insertFile, src).call(insertParagraph)

        onChange(change)
    }
}

export default PlusMenu
