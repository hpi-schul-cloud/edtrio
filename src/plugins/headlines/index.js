import React from 'react'

export default function Headlines(options) {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [{ schema }, RenderHeadlines]
  }
}

const schema = {
  blocks: {
    h1: {
      marks: []
    },
    h2: {
      marks: []
    },
    h3: {
      marks: []
    },
    h4: {
      marks: []
    },
    h5: {
      marks: []
    }
  }
}

const RenderHeadlines = {
  renderNode(props) {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'h1':
        return <h2 {...attributes}>{children}</h2>
      case 'h2':
        return <h3 {...attributes}>{children}</h3>
      case 'h3':
        return <h4 {...attributes}>{children}</h4>
      case 'h4':
        return <h5 {...attributes}>{children}</h5>
      case 'h5':
        return <h6 {...attributes}>{children}</h6>
      default:
        return
    }
  }
}
