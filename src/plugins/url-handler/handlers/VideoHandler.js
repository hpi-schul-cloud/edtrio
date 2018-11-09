import React from 'react'

import insertParagraph from '../../helpers/insertParagraph'

import mimeLookup from 'browser-media-mime-type'

export default function YoutubeHandler(options) {
  return {
    validate,
    dealWithIt,
    changes: {
      insertVideo
    },
    helpers: {},
    components: {
      VideoNode
    },
    plugins: [RenderVideoNode]
  }
}

const validate = url => {
  const fileExtension = url.substr(url.lastIndexOf('.') + 1)
  const mimeType = mimeLookup(fileExtension)
  return mimeType.includes('video')
}

const dealWithIt = (url, change) => {
  const fileExtension = url.substr(url.lastIndexOf('.') + 1)
  const mimeType = mimeLookup(fileExtension)
  change.call(insertVideo, url, mimeType).call(insertParagraph)
  return true
}

function insertVideo(change, src, mimeType, target) {
  //TODO: what does this do?
  /*
    if(target) {
        change.select(target)
    }*/

  change.insertBlock({
    type: 'video',
    isVoid: true,
    data: { src, mimeType }
  })
}

function VideoNode(props) {
  const { src, mimeType, selected, ...attributes } = props

  return (
    <div
      className={`plugin-wrapper ${selected ? 'selected' : ''}`}
      {...attributes}
    >
      <video className="video" controls alt="Uploaded by user">
        <source src={src} type={mimeType} />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

const RenderVideoNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props

    if (node.type === 'video') {
      const src = node.data.get('src')
      const mimeType = node.data.get('mimeType')
      if (mimeType.includes('video')) {
        return (
          <VideoNode
            src={src}
            mimeType={mimeType}
            selected={isFocused}
            {...attributes}
          />
        )
      }
    }
  }
}
