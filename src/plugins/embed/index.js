import React from 'react'

import Hotkey from '../helpers/Hotkey'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCode, faVideo } from '@fortawesome/free-solid-svg-icons'

export default function Embed(options) {
  return {
    changes: {},
    helpers: {
      toggleEmbedBlock
    },
    components: {
      EmbedNode
    },
    plugins: [
      Hotkey('Control+e', toggleEmbedBlock),
      RenderEmbedNode,
      { schema }
    ]
  }
}

const schema = {
  blocks: {
    embed: {
      marks: []
    }
  }
}

function toggleEmbedBlock(change) {
  const isCode = change.value.blocks.some(block => block.type === 'embed')
  change.setBlocks(isCode ? 'p' : 'embed')
  return true
}

function EmbedNode(props) {
  return (
    <div className="control has-icons-left">
      <p
        className={`input ${props.selected ? 'is-focused' : ''}`}
        {...props.attributes}
      >
        {props.children}
      </p>
      <span className="icon is-left">
        <FontAwesomeIcon icon={faVideo} />
      </span>
    </div>
  )
}

const RenderEmbedNode = {
  renderNode(props) {
    return props.node.type === 'embed' ? (
      <EmbedNode selected={props.isFocused} {...props} />
    ) : null
  }
}
