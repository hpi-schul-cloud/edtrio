import React from 'react'
import './style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faChevronDown, faChevronUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function Section(options) {
    return {
        changes: {
            handleToggleVisibility,
            handleDelete,
        },
        helpers: {
            getParentSection,
        },
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

/**
 * Hides/unhides the current section
 */
const handleToggleVisibility = (change, onChange, isVisible) => {
    const parentSection = getParentSection(change)
    
    const c = change.setNodeByKey(parentSection.key, {
        data: {
            isVisible: !isVisible
        }
    })
    onChange(c)
}

/**
 * Delete the current section
 */
const handleDelete = (change, onChange) => {
    const parentSection = getParentSection(change)

    const c = change.removeNodeByKey(parentSection.key)
    onChange(c)
}

const getParentSection = change => {
    let parent = change.value.anchorBlock
    do {
        parent = change.value.document.getParent(parent.key)
        
        if(!parent) {
            console.error('Couldn\'t find parent.')
            return
        }
    } while (parent.type !== 'section')

    return parent
}

const RenderSectionNode = {
    renderNode({ attributes, editor, children, node, isFocused }) {
        
        if(node.type === 'section') {
            const isVisible = node.data.get('isVisible')
            return (
                <section
                    className={`section content ${!isVisible ? 'hidden' : ''}`}
                    {...attributes}
                >
                    { children }
                    {
                        isFocused ? (
                            <aside className="buttons section-controls">
                                <a className="button is-white" onMouseDown={
                                    e => {
                                        e.preventDefault()
                                        handleDelete(editor.value.change(), editor.props.onChange)
                                    }   
                                }>
                                    <span className="icon is-small">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                    </span>
                                </a>
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
    renderPlaceholder({ node, editor }) {
        if(node.object !== 'block') return
        if(node.type !== 'p') return
        if(node.text !== '') return

        return (
            <span
                contentEditable={false}
                style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap' }}
                className="has-text-grey"
                onMouseDown={
                    e => {
                        const change = editor.value.change()
                        const onChange = editor.props.onChange
                        onChange(change.moveToStartOfNode(node).focus())
                        return true
                    }
                }
                >
                Schreib etwas Spannendes...
            </span>
        )
    }
}
