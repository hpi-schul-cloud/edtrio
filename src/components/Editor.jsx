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

    render() {
        return (
            <div style={{ width: 800, padding: 15, margin: '0 auto' }}>
                {this.state.contentElements.map((contentElement, i) => {
                    const Plugin = this._resolvePlugin(contentElement.type)
                    return (<Plugin key={i}
                                    type={contentElement.type}
                                    content={contentElement.content} />)
                })}
            </div>
        )
    }
}

export default Editor
