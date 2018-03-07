import React, { Component } from 'react'

import initialContent from './dummyContent.json'

import TextPlugin from './plugins/TextPlugin'
import DummyPlugin from './plugins/DummyPlugin'
import MissingPlugin from './plugins/MissingPlugin'


class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentElements: initialContent
        }
    }
   
    /**
     * Resolves a plugin by type
     * @param {string} pluginType Name of the plugin to be resolved
     * @returns {plugin} Resolved plugin or `ErrorPlugin` if none was found
     */
    _resolvePlugin(pluginType) {
        const mapping = {
            'sc/text': TextPlugin,
            'dummy/text': DummyPlugin,
        }

        if(mapping.hasOwnProperty(pluginType)) {
            return mapping[pluginType]
        }
        
        return MissingPlugin
    }

    _handleContentChange(newContent, pluginId) {
        let oldContentElements = this.state.contentElements

        // 1. get id of element
        let indexOfPlugin = -1
        oldContentElements.filter((element, index) => {
            if(element.id === pluginId) {
                indexOfPlugin = index
            }
        })

        // 2. manipulate old state
        oldContentElements[indexOfPlugin] = newContent
        const newContentElements = oldContentElements
        
        // 3. save new state
        this.setState({
            contentElements: newContentElements
        })
    }

    render() {
        return (
            <div style={{ width: 800, padding: 15, margin: '0 auto' }}>
                {this.state.contentElements.map((contentElement, i) => {
                    const Plugin = this._resolvePlugin(contentElement.type)
                    return (<Plugin key={i}
                                    id={contentElement.id}
                                    type={contentElement.type}
                                    content={contentElement.content}
                                    saveToEditor={this._handleContentChange.bind(this)} />)
                })}
            </div>
        )
    }
}

export default Editor
