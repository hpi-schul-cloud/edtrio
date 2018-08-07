import React from 'react'

// Taken and adapted from https://github.com/ianstormtaylor/slate/blob/master/examples/markdown-shortcuts/index.js


export default function MarkdownShortcuts(options) {
    return {
        changes: {},
        helpers: {},
        components: {},
        plugins: [
            RenderMoreTextBlocks,
            HandleKeyDown,
        ]
    }
}

const HandleKeyDown = {
    onKeyDown(event, change) {
        switch(event.key) {
            case ' ':
                return onSpace(event, change)
            case 'Backspace':
                return onBackspace(event, change)
            case 'Enter':
                return onEnter(event, change)
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
    if (type == 'list-item' && startBlock.type == 'list-item') return
    event.preventDefault()

    change.setBlocks(type)

    if (type == 'list-item') {
        change.wrapBlock('bulleted-list')
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
    if (selection.start.offset != 0) return

    const { startBlock } = value
    if (startBlock.type == 'paragraph') return

    event.preventDefault()
    change.setBlocks('paragraph')

    if (startBlock.type == 'list-item') {
        change.unwrapBlock('bulleted-list')
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
    if (start.offset == 0 && startBlock.text.length == 0)
        return onBackspace(event, change)
    if (end.offset != startBlock.text.length) return

    if (
        startBlock.type != 'heading-one' &&
        startBlock.type != 'heading-two' &&
        startBlock.type != 'heading-three' &&
        startBlock.type != 'heading-four' &&
        startBlock.type != 'heading-five' &&
        startBlock.type != 'heading-six' &&
        startBlock.type != 'block-quote'
    ) {
        return
    }

    event.preventDefault()
    change.splitBlock().setBlocks('paragraph')
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
            return 'list-item'
        case '>':
            return 'block-quote'
        case '#':
            return 'heading-one'
        case '##':
            return 'heading-two'
        case '###':
            return 'heading-three'
        case '####':
            return 'heading-four'
        case '#####':
            return 'heading-five'
        case '######':
            return 'heading-six'
        default:
            return null
    }
}


const RenderMoreTextBlocks = {
    renderNode(props) {
        const { attributes, children, node } = props

        switch(node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            // h1 and h2 are in plugins/text-menu
            case 'heading-three':
                return <h3 {...attributes}>{children}</h3>
            case 'heading-four':
                return <h4 {...attributes}>{children}</h4>
            case 'heading-five':
                return <h5 {...attributes}>{children}</h5>
            case 'heading-six':
                return <h6 {...attributes}>{children}</h6>
        }
    }
}