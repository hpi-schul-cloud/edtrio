import React from 'react'

import { Text, Block } from 'slate'

export default function Poll(options) {
  return {
    changes: {
      insertPoll
    },
    helpers: {},
    components: {
      PollNode
    },
    plugins: [RenderPollNode]
  }
}

/**
 * Change that inserts an image block displaying the src image
 */
function insertPoll(change, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock(
    Block.create({
      type: 'poll',
      nodes: [Text.create()]
    })
  )
}

/**
 * React Component that displays an actual image from props.src url
 */
function PollNode(props) {
  const { children, ...attributes } = props
  console.log('POLL', attributes)
  return (
    <h1 className="title is-1" {...attributes}>
      {children}
    </h1>
  )
}

/**
 * Overwrites Slates Editor.renderNode(props) to actually render
 * ImageNode for `img` tags
 */
const RenderPollNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props

    if (node.type === 'poll') {
      return <PollNode selected={isFocused} {...attributes} />
    }
  }
}
