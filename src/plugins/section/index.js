import React from 'react'

export default function Section(options) {
    return {
        changes: {},
        helpers: {},
        components: {},
        plugins: [
            RenderSectionNode,
            RenderPlaceholderP,
            { schema }
        ],
    }
}

//TODO: have a look at normalizeNode and node_data_invalid as error code at some point
const schema = {
    blocks: {
        section: {
            data: {
                isVisible: v => typeof(v) === 'boolean'
            }
        }
    }
}

const RenderSectionNode = {
    renderNode(props) {
        const { attributes, children, node } = props
        
        if(node.type === 'section') {
            console.log(node.data.get('isVisible'))
            return (
                <section className="section content has-background-light" {...attributes}>
                    { children }
                </section>
            )
        } else if(node.type === 'p') {
            return (
                <p {...attributes}>
                    { children }
                </p>
            )
        }
    }
}

const RenderPlaceholderP = {
    renderPlaceholder({ node }) {
        if(node.object !== 'block') return
        if(node.type !== 'p') return
        if(node.text !== '') return

        return (
            <span
                contentEditable={false}
                style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap' }}
                className="has-text-grey"
                >
                Now start typing something
            </span>
        )
    }
}
