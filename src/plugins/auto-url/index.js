import React from 'react'

import InstantReplace from 'slate-instant-replace'
import isUrl from 'is-url'

export default function AutoURL(options) {
    return {
        changes: {},
        helpers: {},
        components: {},
        plugins: [
            InstantReplace(AddURL),
            RenderLinkNode
        ],
    }
}

const wrapLink = (change, href) => {
    change.wrapInline({
        type: 'link',
        data: { href }
    })
    change.collapseToEnd()
}

const unwrapLink = (change) => {
    change.unwrapInline('link')
}

const AddURL = (change, lastWord) => {
    if(isUrl(lastWord)) {
        change.extend(-lastWord.length)
        change.focus()
        
        change.call(unwrapLink)
        
		const href = lastWord.startsWith('http') ? lastWord : `https://${lastWord}`;
        
        change.call(wrapLink, href)
    }
}

function LinkNode(props) {
    const { attributes, children, node } = props
    const { data } = node
    const href = data.get('href')
    
    return (
        <a { ...attributes } href={href}>
            { children }
        </a>
    )
}

const RenderLinkNode = {
    renderNode(props) {
        return props.node.type === 'link' ? <LinkNode {...props} /> : null
    }
}
