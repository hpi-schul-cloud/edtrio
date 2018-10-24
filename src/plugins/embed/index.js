import React from 'react'

import Hotkey from '../helpers/Hotkey'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faVimeo } from '@fortawesome/free-brands-svg-icons'

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

/**
 * TODO:
 *  - placeholder url
 *  - autodetect url then display iframe
 */

function toggleEmbedBlock(change) {
  const isCode = change.value.blocks.some(block => block.type === 'embed')
  change.setBlocks(isCode ? 'p' : 'embed')
  return true
}

const RenderEmbedNode = {
  renderNode(props) {
    return props.node.type === 'embed' ? (
      <EmbedNode selected={props.isFocused} {...props} />
    ) : null
  }
}

class EmbedNode extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'youtube'
    }
  }

  render() {
    const { selected, attributes, children } = this.props

    return (
      <div className="control has-icons-left">
        <p
          className={`input ${selected ? 'is-focused' : ''}`}
          placeholder="Hey?"
          {...attributes}
        >
          {children}
        </p>
        <span className="icon is-left">
          <ServiceTypeIcon type="" />
        </span>
      </div>
    )
  }
}

class ServiceTypeIcon extends React.Component {
  render() {
    const { type } = this.props

    let icon
    switch (type) {
      case 'youtube':
        icon = faYoutube
        break
      case 'vimeo':
        icon = faVimeo
        break
      default:
        icon = faExternalLinkSquareAlt
    }

    return <FontAwesomeIcon icon={icon} size="lg" />
  }
}
