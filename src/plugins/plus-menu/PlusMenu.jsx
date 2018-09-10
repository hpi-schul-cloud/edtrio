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
                {this.renderBlockButton('img', 'fa-image', 'Image')}
                {this.renderBlockButton('code', 'fa-code', 'Code Block')}
                {this.renderBlockButton('iframe', 'fa-external-link-square-alt', 'Iframe')}
            </div>,
            root
        )
    }

    renderBlockButton = (type, icon, helperText=null, onClickBlock= () => {}) => (
        <a
            title={helperText}
            onMouseDown={event => onClickBlock(event, type)}
        >
            <span className="icon is-medium has-text-grey-lighter">
                <i className={`fas ${icon} fa-lg`}></i>
            </span>
        </a>
    )

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
