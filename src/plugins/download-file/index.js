import React from 'react'
import DownloadButton from './DownloadButton'


export default function DownloadFile(options) {
    return {
        changes: {},
        helpers: {},
        components: {
            DownloadButton,
        },
        plugins: [
            RenderFileNode,
        ],
    }
}

const RenderFileNode = {
    renderNode(props) {
        const { attributes, node, isFocused, children } = props

        if (node.type === 'file') {
            const src = node.data.get('src')
            return (
                <DownloadButton
                    src={src}
                    selected={isFocused}
                    children={children}
                    {...attributes}
                />
            )
        }
    }
}