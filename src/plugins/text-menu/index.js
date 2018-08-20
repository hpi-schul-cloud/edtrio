import React from 'react'
import HoverMenu from './HoverMenu'


export default function TextMenu(options) {
    return {
        changes: {},
        helpers: {},
        components: {
            HoverMenu
        },
        plugins: [
            RenderTextMarks,
            RenderTextBlocks,
        ],
    }
}

const RenderTextMarks = {
    renderMark(props) {
        const { children, mark, attributes } = props
    
        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'code':
                return <code {...attributes}>{children}</code>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            default:
                return
        }
    }
}

const RenderTextBlocks = {
    renderNode(props) {
        const { attributes, children, node } = props

        switch(node.type) {
            case 'title':
                return <h1 {...attributes}>TITLE: {children}</h1>
            case 'h1':
                return <h2 {...attributes}>{children}</h2>
            case 'h2':
                return <h3 {...attributes}>{children}</h3>
            default:
                return
        }
    }
}
