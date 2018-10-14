import React from 'react'
import { getEventTransfer } from 'slate-react'
import isUrl from 'is-url'

import YoutubeHandler from './handlers/YoutubeHandler'
import VimeoHandler from './handlers/VimeoHandler'

const { YoutubeNode } = YoutubeHandler().components
const { VimeoNode } = VimeoHandler().components

export default function URLHandler(options) {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [
      HandlePaste,
      ...YoutubeHandler().plugins,
      { schema },
      RenderVideoNode
    ]
  }
}

const schema = {
  blocks: {
    video: {
      isVoid: true
    }
  }
}

const HandlePaste = {
  onPaste(event, change) {
    const transfer = getEventTransfer(event)
    const { type, text } = transfer

    if (type === 'text') {
      if (!isUrl(text)) {
        return
      }

      if (YoutubeHandler().validate(text)) {
        return YoutubeHandler().dealWithIt(text, change)
      } else if (VimeoHandler().validate(text)) {
        return VimeoHandler().dealWithIt(text, change)
      }

      return
    }
  }
}

const RenderVideoNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props

    if (node.type === 'video') {
      const videoId = node.data.get('videoId')
      const provider = node.data.get('provider')

      switch (provider) {
        case 'youtube':
          return (
            <YoutubeNode
              videoId={videoId}
              selected={isFocused}
              {...attributes}
            />
          )
        case 'vimeo':
          return (
            <VimeoNode videoId={videoId} selected={isFocused} {...attributes} />
          )
        default:
          return
      }
    }
  }
}
