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
        ],
    }
}

const HandleKeyDown = {
    onKeyDown(event, change) {

        if(event.key === 'Enter') {
            console.log('pressed the enter')

            if(change.value.startBlock.type !== 'title') {
                return
            }

            event.preventDefault()
            change.splitBlock().setBlocks('p')
        }

        return
    }
}

const RenderTitleNode = {
    renderNode(props) {
        const { attributes, children, node } = props

        /*if(children) {
            console.log(children[0].props.node.text)
        } else {
            'has not'
        }*/


        if(node.type === 'title') {
            return (
                <h1 {...attributes}>
                    TITLE: {children}
                </h1>)
        }
    }
}

const RenderSectionNode = {
    renderNode(props) {
        const { attributes, children, node } = props

        if(node.type === 'section') {
            return (
                <div className="section" {...attributes}>
                    { children }
                </div>
            )
        }
    }
}
