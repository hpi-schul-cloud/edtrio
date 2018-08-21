import React from 'react'
import DownloadButton from './DownloadButton'


export default function FilePlugin(options) {
    return {
        changes: {},
        helpers: {},
        components: {
            DownloadButton,
        },
        plugins: {
            RenderTextBlocks,
        },
    }
}

const RenderTextBlocks = {
    renderNode(props) {
        console.log('XXXXX')
        return
    }
}

// TODO: fix this not being rendered for some reason... <.<

const RenderFileNode = {
    renderNode(props) {
        console.log('poiop')
        const { attributes, node } = props

        if(node.type === 'file') {
            console.log('yeah yeah yeah')
            const src = node.data.get('src')
            return (
                <DownloadButton
                    src={src}
                    {...attributes}
                />
            )
        }
    }
}
