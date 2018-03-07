import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'

import initialContent from './dummyContent.json'
import AddPlugin from './AddPlugin'

import TextPlugin from './plugins/TextPlugin'
import DummyPlugin from './plugins/DummyPlugin'
import MissingPlugin from './plugins/MissingPlugin'


class Editor extends Component {
    constructor(props) {
        super(props)
        this.pluginMapping = {
            'sc/text': TextPlugin,
            'dummy/text': DummyPlugin,
        }
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
        if(this.pluginMapping.hasOwnProperty(pluginType)) {
            return this.pluginMapping[pluginType]
        }
        
        return MissingPlugin
    }

    /**
     * Persist the content changes of a plugin into
     * the global Editor document state
     * @param {object} newContent JSON object of new content
     * @param {string} pluginId ID of plugin that has changed content
     */
    _handleContentChange(newContent, pluginId) {
        let oldContentElements = this.state.contentElements.slice()

        // 1. get id of element
        const indexOfPlugin = this.state.contentElements.findIndex(e => e.id === pluginId)

        // 2. manipulate old state
        oldContentElements[indexOfPlugin] = newContent
        const newContentElements = oldContentElements
        
        // 3. save new state
        this.setState({
            contentElements: newContentElements
        })
    }

    /**
     * Add a plugin to the current document by name
     * @param {string} pluginName Name to be resolved via this.pluginMapping
     */
    _addPlugin(pluginName) {
        const newElement = {
            type: pluginName,
            id: uuidv4(),
            content: null
        }
        this.setState({
            contentElements: [...this.state.contentElements, newElement]
        })
    }

    _removePlugin(pluginId) {
        const indexOfPlugin = this.state.contentElements.findIndex(e => e.id === pluginId)
        let newContentElements = this.state.contentElements.slice()
        if(indexOfPlugin === -1) {
            return
        }
        newContentElements.splice(indexOfPlugin, 1)

        this.setState({
            contentElements: newContentElements
        })
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ width: 800, padding: 15, margin: '0 auto' }}>
                    {this.state.contentElements.map((contentElement, i) => {
                        const Plugin = this._resolvePlugin(contentElement.type)
                        return (<Plugin
                                    key={i}
                                    id={contentElement.id}
                                    type={contentElement.type}
                                    content={contentElement.content}
                                    handleRemovePlugin={this._removePlugin.bind(this)}
                                    saveToEditor={this._handleContentChange.bind(this)} />)
                    })}
                </div>
                <AddPlugin
                    open={this.state.addPluginOpen}
                    allPlugins={this.pluginMapping}
                    addPlugin={this._addPlugin.bind(this)} />
            </React.Fragment>
        )
    }
}

export default Editor
