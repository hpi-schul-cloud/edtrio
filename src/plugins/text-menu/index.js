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
            case 'strong':
                return <strong {...attributes}>{children}</strong>
            case 'code':
                return <code {...attributes}>{children}</code>
            case 'em':
                return <em {...attributes}>{children}</em>
            default:
                return
        }
    }
}

const RenderTextBlocks = {
    renderNode(props) {
        const { attributes, children, node } = props

        switch(node.type) {
            case 'h1':
                return <h2 {...attributes}>{children}</h2>
            case 'h2':
                return <h3 {...attributes}>{children}</h3>
            default:
                return
        }
    }
}
