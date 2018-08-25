import React from 'react'

import './style.css'


export default function Image(options) {
    return {
        changes: {
            insertImage,
        },
        helpers: {},
        components: {
            ImageNode,
        },
        plugins: [
            RenderImageNode,
        ],
    }
}

function insertImage(change, src, target) {
    if(target) {
        change.select(target)
    }

    change.insertBlock({
        type: 'img',
        isVoid: true,
        data: { src },
    })
}

function ImageNode(props) {
    const { src, selected, ...attributes} = props

    return (
        <img
            src={src}
            className={`image plugin-wrapper ${selected ? 'selected' : ''}`}
            alt="Uploaded by user"
            {...attributes}
        />
    )
}

const RenderImageNode = {
    renderNode(props) {
        const { attributes, node, isFocused } = props

        if (node.type === 'img') {
            const src = node.data.get('src')
            return (
                <ImageNode
                    src={src}
                    selected={isFocused}
                    {...attributes}
                />
            )
        }
    }
}