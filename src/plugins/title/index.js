import React from 'react'
import { Block, Text } from 'slate'

export default function Title(options) {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [
      RenderTitleNode,
      HandleKeyDown,
      { schema },
      RenderPlaceholder,
      ensureAlwaysMinOneTitle
    ]
  }
}

const schema = {
  blocks: {
    title: {
      marks: []
    }
  }
}

const HandleKeyDown = {
  onKeyDown(event, change) {
    if (event.key === 'Enter') {
      if (change.value.startBlock.type !== 'title') {
        return
      }

      event.preventDefault()
      change.moveToRangeOfNode(change.value.nextBlock)
      return true
    }
    return
  }
}

const RenderTitleNode = {
  renderNode(props) {
    const { attributes, children, node } = props

    if (node.type === 'title') {
      return (
        <h1 className="title is-1" {...attributes}>
          {children}
        </h1>
      )
    }
  }
}

const RenderPlaceholder = {
  renderPlaceholder({ editor, node }) {
    if (node.object !== 'block') return
    if (node.type !== 'title') return
    if (node.text !== '') return

    return (
      <span
        contentEditable={false}
        style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap' }}
        className="has-text-grey-light"
        onMouseDown={e => {
          const change = editor.value.change()
          const onChange = editor.props.onChange
          onChange(change.moveToEndOfNode(node).focus())
          return true
        }}
      >
        Gib mir einen Namen
      </span>
    )
  }
}

const ensureAlwaysMinOneTitle = {
  normalizeNode(node) {
    const { nodes } = node
    if (node.object !== 'document') return
    if (nodes.size > 1) return
    if (nodes.size > 0 && nodes.first().type === 'title') return

    const newTitle = Block.create({
      type: 'title',
      data: {
        isVisible: true
      },
      nodes: [Text.create()]
    })

    return change => change.insertNodeByKey(node.key, 0, newTitle)
  }
}
