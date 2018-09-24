import React from 'react'

import './style.css'

export default function Image(options) {
  return {
    changes: {
      insertImage
    },
    helpers: {},
    components: {
      ImageNode
    },
    plugins: [RenderImageNode]
  }
}

/**
 * Change that inserts an image block displaying the src image
 */
function insertImage(change, src, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'img',
    isVoid: true,
    data: { src }
  })
}

/**
 * React Component that displays an actual image from props.src url
 */
function ImageNode(props) {
  const { src, selected, ...attributes } = props

  return (
    <div className={`plugin-wrapper ${selected ? 'selected' : ''}`}>
      <img src={src} className="image" alt="Uploaded by user" {...attributes} />
      {/*<figcaption>
            Figure 1: Some beautiful placeholders
            </figcaption>*/}
    </div>
  )
}

/**
 * Overwrites Slates Editor.renderNode(props) to actually render
 * ImageNode for `img` tags
 */
const RenderImageNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props

    if (node.type === 'img') {
      const src = node.data.get('src')
      return <ImageNode src={src} selected={isFocused} {...attributes} />
    }
  }
}
