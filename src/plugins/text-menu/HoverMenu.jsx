import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'


class HoverMenu extends Component {
    /**
     * Render.
     *
     * @return {Element}
     */

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
                className={`flobo ${className}`}
                style={this.state.style}
                ref={wrapper => (this.menuWrapper = wrapper)}
            >
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
                {this.renderMarkButton('underlined', 'format_underlined')}
                {this.renderMarkButton('code', 'code')}
            </div>,
            root
        )
    }
  
    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */
  
    renderMarkButton(type, icon) {
        const { value } = this.props
        const isActive = value.activeMarks.some(mark => mark.type == type)
        return (
            <Button
                reversed
                active={isActive}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <Icon>{icon}</Icon>
            </Button>
        )
    }

    update = ({resetMenu = false}) => {

        if(!this.menuWrapper) {
            return
        }

        if (resetMenu) {
            console.log('resettin')
            this.setState({
                style: {}
            })
            return
        }
        
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()


        let newStyle = {}
        newStyle.opacity = 1
        newStyle.top = `${rect.top + window.pageYOffset - this.menuWrapper.offsetHeight}px`
    
        newStyle.left = `${rect.left +
            window.pageXOffset -
            this.menuWrapper.offsetWidth / 2 +
            rect.width / 2}px`

        this.setState({
            style: newStyle
        })
    }
  
    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */
  
    onClickMark(event, type) {
        console.log('CALL ME BABY')
        const { value, onChange } = this.props
        event.preventDefault()
        const change = value.change().toggleMark(type)
        onChange(change)
    }
}




const Icon = ({ className, children, ...rest }) => (
    <span className={`material-icons ${className}`} {...rest}>
        { children }
    </span>
)

const Button = (props) => (
    <span
        style={
            props.active ? {
                color: 'white',
                cursor: 'pointer'
            } : {
                color: '#aaa',
                cursor: 'pointer'
            }
        }
        onMouseDown={props.onMouseDown}
    >
        { props.children }
    </span>
)

export default HoverMenu
