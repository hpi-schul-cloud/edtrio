import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { findDOMNode } from 'slate-react'
import './style.css'


class PlusMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            style: {}
        }
    }
  
    render() {
        const { className } = this.props
        const root = window.document.getElementById('root')
    
        return ReactDOM.createPortal(
            <div
                className={`plus-menu ${className}`}
                style={this.state.style}
                ref={wrapper => (this.menuWrapper = wrapper)}
            >
                <button>Hey Dude</button>
            </div>,
            root
        )
    }

    /**
     * Update the menu's absolute position
     */
    update = ({ resetMenu = false }) => {
        if(!this.menuWrapper) {
            return
        }

        if(resetMenu) {
            this.setState({
                style: {}
            })
            return
        }

        const nodeEl = findDOMNode(this.props.value.startBlock)
        const nodeElBBox = nodeEl.getBoundingClientRect()
        const top = nodeElBBox.top + window.pageYOffset

        const right = window.innerWidth - (nodeElBBox.width + nodeElBBox.x)

        this.setState({
            style: {
                top: `${top}px`,
                right: `${right}px`
            }
        })
    }
}

export default PlusMenu
