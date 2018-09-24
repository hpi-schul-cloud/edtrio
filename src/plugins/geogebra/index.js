import React from 'react'

import GeogebraNode from './Geogebra'

export default function Geogebra(options) {
  return {
    changes: {
      insertGeogebraNode
    },
    helpers: {},
    components: {
      GeogebraNode
    },
    plugins: [RenderGeogebraNode]
  }
}

function insertGeogebraNode(change, id, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'geogebra',
    isVoid: true,
    data: { id }
  })
}

const RenderGeogebraNode = {
  renderNode(props) {
    const { attributes, node, isFocused } = props

    if (node.type === 'geogebra') {
      const id = node.data.get('id')

      return (
        <GeogebraNode selected={isFocused} resourceId={id} {...attributes} />
      )
    }
  }
}

/**
 * onClickGeogebraButton = event => {
        const { insertGeogebraNode } = Geogebra().changes

        event.preventDefault()
        const id = window.prompt('Enter the geogebra id:') || 'RHYH3UQ8'
        if(!id) return

        const change = this.state.value.change().call(insertGeogebraNode, id).call(insertParagraph)

        this.onChange(change)
    }
 */
