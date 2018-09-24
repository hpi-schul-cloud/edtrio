import React from 'react'

import Hotkey from '../helpers/Hotkey'

export default function Code(options) {
  return {
    changes: {},
    helpers: {
      toggleCodeBlock
    },
    components: {
      CodeNode
    },
    plugins: [Hotkey('Control+c', toggleCodeBlock), RenderCodeNode, { schema }]
  }
}

const schema = {
  blocks: {
    code: {
      marks: []
    }
  }
}

function toggleCodeBlock(change) {
  const isCode = change.value.blocks.some(block => block.type === 'code')
  change.setBlocks(isCode ? 'p' : 'code')
  return true
}

function CodeNode(props) {
  return (
    <pre
      {...props.attributes}
      className={`plugin-wrapper ${props.isFocused ? 'selected' : ''}`}
    >
      <code>{props.children}</code>
    </pre>
  )
}

const RenderCodeNode = {
  renderNode(props) {
    return props.node.type === 'code' ? <CodeNode {...props} /> : null
  }
}
