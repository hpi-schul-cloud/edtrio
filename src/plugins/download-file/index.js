import React from 'react'
import DownloadButton from './DownloadButton'

export default function DownloadFile(options) {
  return {
    changes: {
      insertFile
    },
    helpers: {},
    components: {
      DownloadButton
    },
    plugins: [RenderFileNode]
  }
}

function insertFile(change, src, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'file',
    isVoid: true,
    data: { src }
  })
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
