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

        /**
         * TODO:
         * - refactor a lil prettier
         * - make text greyish when placeholder
         * - pbbly move caret to beginning of row / text unselectable
         */

        const leavesOfFirstChild = children[0].props.block.get('nodes').toJSON()[0].leaves
        const noText = leavesOfFirstChild ? leavesOfFirstChild[0].text.length : 'LOL'
        console.log(noText)


        if(node.type === 'title') {
            return (
                <h1 className="title is-1" {...attributes}>
                    {children}
                    {noText === 0 ? 'Give me a name' : null}
                </h1>)
        }
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
