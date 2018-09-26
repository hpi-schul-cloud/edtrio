import React from 'react'
import HoverMenu from './HoverMenu'

export default function TextMenu(options) {
  return {
    changes: {},
    helpers: {},
    components: {
      HoverMenu
    },
    plugins: [RenderTextMarks]
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
