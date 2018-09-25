import React from 'react'
import './style.css'

import Controls from './Controls'

import { Block, Text } from 'slate'

export default function Section(options) {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [
      RenderSectionNode,
      RenderPNode,
      RenderPlaceholderP,
      { schema },
      dealWithDeletedSection
    ]
  }
}

//TODO: have a look at normalizeNode and node_data_invalid as error code at some point
const schema = {
  blocks: {
    section: {
      data: {
        isVisible: v => typeof v === 'boolean'
      }
    }
  }
}

const RenderSectionNode = {
  renderNode({ attributes, editor, children, node, isFocused }) {
    if (node.type === 'section') {
      const isVisible = node.data.get('isVisible')
      return (
        <section
          className={`section content ${!isVisible ? 'hidden' : ''}`}
          {...attributes}
        >
          {children}
          {isFocused ? (
            <Controls editor={editor} isVisible={isVisible} />
          ) : null}
        </section>
      )
    }
  }
}

const RenderPNode = {
  renderNode({ attributes, children, node }) {
    if (node.type === 'p') {
      return <p {...attributes}>{children}</p>
    }
  }
}

const RenderPlaceholderP = {
  renderPlaceholder({ node, editor }) {
    if (node.object !== 'block') return
    if (node.type !== 'p') return
    if (node.text !== '') return

    return (
      <span
        contentEditable={false}
        style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap' }}
        className="has-text-grey"
        onMouseDown={e => {
          const change = editor.value.change()
          const onChange = editor.props.onChange
          onChange(change.moveToStartOfNode(node).focus())
          return true
        }}
      >
        Schreib etwas Spannendes...
      </span>
    )
  }
}

const dealWithDeletedSection = {
  normalizeNode(node) {
    const { nodes } = node
    if (node.object !== 'document') return
    if (nodes.size >= 2) return
    if (nodes.first().type !== 'title') return
    if (nodes.last().type === 'section') return

    console.log('Kay, we f*ed up the sections')

    const newSection = Block.create({
      type: 'section',
      data: {
        isVisible: true
      },
      nodes: [
        Block.create({
          type: 'p',
          nodes: [Text.create()]
        })
      ]
    })

    return change => change.insertNodeByKey(node.key, nodes.count(), newSection)
    /*
    const document = change.value.document
    const lastIndex = document.nodes.count()
  
    return change
      .insertNodeByKey(document.key, lastIndex, newSection)
      .moveToEndOfNode(newSection)*/
  }
}
