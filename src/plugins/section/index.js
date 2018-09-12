import React from 'react'
import './style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

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

const handleToggleVisibility = (change, onChange, isVisible) => {
    const parent = change.value.document.getParent(change.value.anchorBlock.key)
    const c = change.setNodeByKey(parent.key, {
        data: {
            isVisible: !isVisible
        }
    })
    onChange(c)
}

const RenderSectionNode = {
    renderNode({ attributes, editor, children, node, isFocused }) {
        
        if(node.type === 'section') {
            const isVisible = node.data.get('isVisible')
            return (
                <section className="section content has-background-light" {...attributes}>
                    { children }
                    {
                        isFocused ? (
                            <aside className="buttons section-controls">
                                <a className="button is-white">
                                    <span className="icon is-small">
                                    <FontAwesomeIcon icon={faChevronUp} />
                                    </span>
                                </a>
                                <a className="button is-white">
                                    <span className="icon is-small">
                                    <FontAwesomeIcon icon={faChevronDown} />
                                    </span>
                                </a>
                                <a className="button is-white" onMouseDown={
                                    e => {
                                        e.preventDefault()
                                        handleToggleVisibility(editor.value.change(), editor.props.onChange, isVisible)
                                    }   
                                }>
                                    <span className="icon is-small">
                                    <FontAwesomeIcon icon={!!isVisible ? faEye : faEyeSlash} />
                                    </span>
                                </a>
                            </aside>
                        ) : null
                    }
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
