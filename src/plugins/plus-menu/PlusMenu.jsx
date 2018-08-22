import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { findDOMNode } from 'slate-react'

import Button from '../helpers/Button'
import Icon from '../helpers/Icon'

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

        const { value, onChange } = this.props
        event.preventDefault()
        const change = value.change()

        change.setBlocks(type)

        onChange(change)
    }

    update = ({ resetMenu = false }) => {
        //yeah this part is pretty much broken atm
        /*
        
        console.log('oi')
        if(!this.menuWrapper) {
            console.log('uh')
            return
        }

        if(resetMenu) {
            this.setState({
                style: {}
            })
            console.log('ah')
            return
        }

        const { value } = this.props
        console.log(value.selection.focus)
        //console.log(findDOMNode(value.selection))

        const selection = window.getSelection()
        return
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        let newStyle = {}
        newStyle.opacity = 1
        newStyle.top = `${rect.top + window.pageYOffset - this.menuWrapper.offsetHeight}px`

        console.log(`placing at top: ${rect.top + window.pageYOffset - this.menuWrapper.offsetHeight}px`)

        this.setState({
            style: newStyle
        })
        */
    }
}

export default PlusMenu
