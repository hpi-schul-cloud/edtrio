import React from 'react'

import GeogebraNode from './Geogebra'


export default function Geogebra(options) {
    return {
        changes: {
            insertGeogebraNode,
        },
        helpers: {},
        components: {
            GeogebraNode,
        },
        plugins: [
            RenderGeogebraNode,
        ]
    }
}

function insertGeogebraNode(change, id, target) {
    if(target) {
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

        if(node.type === 'geogebra') {
            const id = node.data.get('id')

            return (
                <GeogebraNode
                    selected={isFocused}
                    resourceId={id}
                    {...attributes}
                />
            )
        }
    }
}