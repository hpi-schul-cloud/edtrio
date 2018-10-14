import React from 'react'

export default function VimeoHandler(options) {
  return {
    validate,
    dealWithIt,
    changes: {
      insertVimeoVideo
    },
    helpers: {},
    components: {
      VimeoNode
    },
    plugins: []
  }
}

// eslint-disable-next-line
const _regex = /vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/i

const validate = url => {
  return !!_regex.exec(url)
}

const dealWithIt = (url, change) => {
  const videoId = _regex.exec(url)[2]
  change.call(insertVimeoVideo, videoId)
  return true
}

function insertVimeoVideo(change, videoId) {
  change.insertBlock({
    type: 'video',
    data: {
      videoId,
      provider: 'vimeo'
    }
  })
}

function VimeoNode(props) {
  const { videoId, selected, ...attributes } = props

  return (
    <div
      className={`plugin-wrapper ${selected ? 'selected' : ''}`}
      style={{ display: 'flex', flexDirection: 'column' }}
      {...attributes}
    >
      <iframe
        title="Vimeo Video"
        style={{ minHeight: '25rem' }}
        src={`https://player.vimeo.com/video/${videoId}`}
        frameBorder="0"
        allowFullScreen
      />
      <script src="https://player.vimeo.com/api/player.js" />
    </div>
  )
}
