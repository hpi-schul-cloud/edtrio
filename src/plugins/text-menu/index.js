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
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            default:
                return
        }
    }
}
