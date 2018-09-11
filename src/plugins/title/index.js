import React from 'react'


export default function Title(options) {
    return {
        changes: {},
        helpers: {},
        components: {},
        plugins: [
            RenderTitleNode,
            RenderSectionNode,
            HandleKeyDown,
            { schema },
            RenderPlaceholder,
            RenderPlaceholderP,
        ],
    }
}

const schema = {
    blocks: {
        title: {
            marks: []
        }
    }
}

const HandleKeyDown = {
    onKeyDown(event, change) {

        if(event.key === 'Enter') {
            if(change.value.startBlock.type !== 'title') {
                return
            }

            
            //event.preventDefault()
            //const parent = change.value.document.getParent(change.value.nextBlock.key)
            //change.moveToRangeOf(parent)
        }

        return
    }
}

const RenderTitleNode = {
    renderNode(props) {
        const { attributes, children, node } = props

        if(node.type === 'title') {
            return (
                <h1 className="title is-1" {...attributes}>
                    {children}
                </h1>
            )
        }
    }
}

const RenderPlaceholder = {
    renderPlaceholder({ node }) {
        if(node.object !== 'block') return
        if(node.type !== 'title') return
        if(node.text !== '') return

        return (
            <span
                contentEditable={false}
                style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap' }}
                className="has-text-grey-light"
                >
                Give me a name
            </span>
        )
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

const RenderSectionNode = {
    renderNode(props) {
        const { attributes, children, node } = props

        if(node.type === 'section') {
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
