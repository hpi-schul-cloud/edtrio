import React from 'react'

export default {
    onKeyDown(event, change, editor) {
        if (event.key != 'c' || !event.ctrlKey) return

        console.log('pressed ctrl+c!')
        const isCode = change.value.blocks.some(block => block.type == 'code')
        change.setBlocks(isCode ? 'paragraph' : 'code')

        return true
    },
    renderNode(props) {
        return props.node.type === 'code' ? <CodeNode {...props} /> : null
    }
}

function CodeNode(props) {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}
