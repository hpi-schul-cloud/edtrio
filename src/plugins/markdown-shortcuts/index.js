import React from 'react'

// Taken and adapted from https://github.com/ianstormtaylor/slate/blob/master/examples/markdown-shortcuts/index.js

export default function MarkdownShortcuts(options) {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [RenderMoreTextBlocks, HandleKeyDown]
  }
}

const HandleKeyDown = {
  onKeyDown(event, change) {
    switch (event.key) {
      case ' ':
        return onSpace(event, change)
      case 'Backspace':
        return onBackspace(event, change)
      case 'Enter':
        return onEnter(event, change)
      default:
      //pass
    }
  }
}

/**
 * On space, if it was after an auto-markdown shortcut,
 * convert the current node into the shortcut's
 * corresponding type.
 *
 * @param {Event} event
 * @param {Change} change
 */
const onSpace = (event, change) => {
  const { value } = change
  const { selection } = value
  if (selection.isExpanded) return

  const { startBlock } = value
  const { start } = selection
  const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '')
  const type = _getType(chars)

  if (!type) return
  if (type === 'li' && startBlock.type === 'li') return
  event.preventDefault()

  change.setBlocks(type)

  if (type === 'li') {
    change.wrapBlock('ul')
  }

  change.moveFocusToStartOf(startBlock).delete()
  return true
}

/**
 * On backspace, if at the start of a non-paragraph,
 * convert it back into a paragraph node.
 *
 * @param {Event} event
 * @param {Change} change
 */

const onBackspace = (event, change) => {
  const { value } = change
  const { selection } = value
  if (selection.isExpanded) return
  if (selection.start.offset !== 0) return

  const { startBlock } = value
  if (startBlock.type === 'p') return

  event.preventDefault()
  change.setBlocks('p')

  if (startBlock.type === 'li') {
    change.unwrapBlock('ul')
  }

  return true
}

/**
 * On return, if at the end of a node type that
 * should not be extended, create a new paragraph
 * below it.
 *
 * @param {Event} event
 * @param {Change} change
 */

const onEnter = (event, change) => {
  const { value } = change
  const { selection } = value
  const { start, end, isExpanded } = selection
  if (isExpanded) return

  const { startBlock } = value
  if (start.offset === 0 && startBlock.text.length === 0)
    return onBackspace(event, change)
  if (end.offset !== startBlock.text.length) return

  if (
    startBlock.type !== 'h1' &&
    startBlock.type !== 'h2' &&
    startBlock.type !== 'h3' &&
    startBlock.type !== 'h4' &&
    startBlock.type !== 'h5' &&
    startBlock.type !== 'blockquote'
  ) {
    return
  }

  event.preventDefault()
  change.splitBlock().setBlocks('p')
  return true
}

/**
 * Get the block type for a series of auto-markdown shortcut `chars`.
 *
 * @param {String} chars
 * @return {String} block
 */

const _getType = chars => {
  switch (chars) {
    case '*':
    case '-':
    case '+':
      return 'li'
    case '>':
      return 'blockquote'
    case '#':
      return 'h1'
    case '##':
      return 'h2'
    case '###':
      return 'h3'
    case '####':
      return 'h4'
    case '#####':
      return 'h5'
    default:
      return null
  }
}

const RenderMoreTextBlocks = {
  renderNode(props) {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'blockquote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'ul':
        return <ul {...attributes}>{children}</ul>
      case 'li':
        return <li {...attributes}>{children}</li>
      // h1 and h2 are in plugins/text-menu
      case 'h3':
        return <h4 {...attributes}>{children}</h4>
      case 'h4':
        return <h5 {...attributes}>{children}</h5>
      case 'h5':
        return <h6 {...attributes}>{children}</h6>
      default:
      //pass
    }
  }
}
