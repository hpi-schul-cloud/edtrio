import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'

import Icon from '../helpers/Icon'
import Button from '../helpers/Button'

// Taken and adapted from https://github.com/ianstormtaylor/slate/tree/master/examples/hovering-menu
const DEFAULT_NODE = 'p'

class HoverMenu extends Component {
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
        className={`hover-menu ${className}`}
        style={this.state.style}
        ref={wrapper => (this.menuWrapper = wrapper)}
      >
        {this.renderMarkButton('strong', 'format_bold')}
        {this.renderMarkButton('em', 'format_italic')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('h1', 'looks_one', this.onClickBlock)}
        {this.renderBlockButton('h2', 'looks_two', this.onClickBlock)}
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
    const isActive = value.activeMarks.some(mark => mark.type === type)
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

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon, onClickBlock) => {
    const isActive = this.hasBlock(type)

    return (
      <Button
        reversed
        active={isActive}
        onMouseDown={event => onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type === type)
  }

  /**
   * Update the menu's absolute position
   */
  update = () => {
    if (!this.menuWrapper) {
      return
    }

    const { value } = this.props
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      this.setState({
        style: {}
      })
      return
    }

    const nativeSelection = window.getSelection()
    const range = nativeSelection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    let newStyle = {}
    newStyle.opacity = 1
    newStyle.top = `${rect.top +
      window.pageYOffset -
      this.menuWrapper.offsetHeight}px`

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
    const { value, onChange } = this.props
    event.preventDefault()
    const change = value.change().toggleMark(type)
    onChange(change)
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    const { value, onChange } = this.props
    event.preventDefault()
    const change = value.change()

    const isActive = this.hasBlock(type)
    change.setBlocks(isActive ? DEFAULT_NODE : type)

    onChange(change)
  }
}

export default HoverMenu
