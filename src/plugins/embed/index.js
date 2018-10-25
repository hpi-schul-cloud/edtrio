import React from 'react'

import isUrl from 'is-url'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faVimeo } from '@fortawesome/free-brands-svg-icons'

import Hotkey from '../helpers/Hotkey'
import handleUrl from './handlers'

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
 *  - refactor this to files
 *  - add button to plus-menu
 */

function toggleEmbedBlock(change) {
  const isCode = change.value.blocks.some(block => block.type === 'embed')
  change.setBlocks(isCode ? 'p' : 'embed')
  return true
}

const RenderEmbedNode = {
  renderNode(props) {
    return props.node.type === 'embed' ? (
      <EmbedNode
        selected={props.isFocused}
        editor={props.editor}
        node={props.node}
        {...props}
      />
    ) : null
  }
}

class EmbedNode extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      provider: props.node.data.get('provider') || '',
      url: props.node.data.get('url') || ''
    }
  }

  _setDataAttribute = (url, provider) => {
    const { editor, node } = this.props
    const change = editor.value.change()
    const onChange = editor.props.onChange

    const c = change.setNodeByKey(node.key, {
      data: {
        provider: provider,
        url: url
      }
    })
    onChange(c)
  }

  handlePasteUrl = e => {
    e.preventDefault()

    // Get pasted data via clipboard API
    const clipboardData = e.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('Text')

    if (!isUrl(pastedData)) {
      return
    }

    const { provider, url } = handleUrl(pastedData)

    e.stopPropagation()
    this._setDataAttribute(url, provider)
    this.setState({
      url: url,
      provider: provider
    })
  }

  render() {
    const { selected, attributes, children } = this.props
    const { url, provider } = this.state

    return (
      <React.Fragment>
        {url && (
          <div
            className={`plugin-wrapper embed-container ${
              selected ? 'selected' : ''
            }`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 5
            }}
            {...attributes}
          >
            <iframe
              title="Video"
              style={{ minHeight: '22rem' }}
              src={url}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
        <div className="control has-icons-left" {...attributes} style={{}}>
          <p
            className={`input ${selected && !url ? 'is-focused' : ''}`}
            onPaste={this.handlePasteUrl}
          >
            {children}
            {url}
          </p>
          <span className="icon is-left">
            <ServiceTypeIcon type={provider} />
          </span>
        </div>
      </React.Fragment>
    )
  }
}

class ServiceTypeIcon extends React.Component {
  render() {
    const { type } = this.props

    let icon, color
    switch (type) {
      case 'youtube':
        icon = faYoutube
        color = '#ff0000'
        break
      case 'vimeo':
        icon = faVimeo
        color = '#00acf2'
        break
      default:
        icon = faExternalLinkSquareAlt
    }

    return <FontAwesomeIcon icon={icon} style={{ color: color }} size="lg" />
  }
}
