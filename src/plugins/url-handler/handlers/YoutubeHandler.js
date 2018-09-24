import React from 'react'

import insertParagraph from '../../helpers/insertParagraph'

export default function YoutubeHandler(options) {
  return {
    validate,
    dealWithIt,
    changes: {
      insertYoutubeVideo
    },
    helpers: {},
    components: {
      YoutubeNode
    },
    plugins: [RenderYoutubeNode]
  }
}

const _regex = /youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)/i

const validate = url => {
  return !!_regex.exec(url)
}

const dealWithIt = (url, change) => {
  const videoId = _regex.exec(url)[1]
  change.call(insertYoutubeVideo, videoId).call(insertParagraph)
  return true
}

function insertYoutubeVideo(change, videoId, target) {
  //TODO: what does this do?
  /*
    if(target) {
        change.select(target)
    }*/

  change.insertBlock({
    type: 'video',
    isVoid: true,
    data: { videoId }
  })
}

function YoutubeNode(props) {
  const { videoId, selected, ...attributes } = props

  return (
    <div
      className={`plugin-wrapper ${selected ? 'selected' : ''}`}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '500px' }}
      {...attributes}
    >
      <iframe
        {...props.attributes}
        title="YouTube Video"
        style={{ minHeight: '30rem' }}
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
      />
      {/*<div className="subtitle is-6 has-text-centered">Add a caption</div>*/}
    </div>
  )
}

const RenderYoutubeNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props

    if (node.type === 'video') {
      const videoId = node.data.get('videoId')
      return (
        <YoutubeNode videoId={videoId} selected={isFocused} {...attributes} />
      )
    }
  }
}
