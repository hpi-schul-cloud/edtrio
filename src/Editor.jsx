import React, { Component } from 'react'
import { Editor as SlateEditor } from 'slate-react'
import { Value } from 'slate'

import TextMenu from './plugins/text-menu'
import PlusMenuPlugin from './plugins/plus-menu'
import CodeBlockPlugin from './plugins/code-block'
import AutoURL from './plugins/auto-url'
import Image from './plugins/image'
import Geogebra from './plugins/geogebra'
import URLHandler from './plugins/url-handler'
import MarkdownShortcuts from './plugins/markdown-shortcuts'
import Title from './plugins/title'
import Section from './plugins/section'
import Iframe from './plugins/iframe'
import DownloadFile from './plugins/download-file'

import DocumentViewer from './dev-document-viewer/DocumentViewer'
import AddSection from './plugins/add-section'
import schema from './schema'

import importedValue from './value'
const initialValue = Value.fromJSON(importedValue)


  class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: initialValue,
        }

        this.plugins = [
            ...Title().plugins,
            ...Section().plugins,
            ...TextMenu().plugins,
            ...MarkdownShortcuts().plugins,
            ...Iframe().plugins,
            ...DownloadFile().plugins,
            ...URLHandler().plugins,
            ...CodeBlockPlugin().plugins,
            ...Image().plugins,
            ...Geogebra().plugins,
            ...AutoURL().plugins,
        ]
    }

    componentDidMount = () => {
        this.updateMenu()
    }

    componentDidUpdate = () => {
        this.updateMenu()
    }
    
    onChange = ({ value }) => {
        this.setState({ value })
    }
    
    /**
     * handles UI updates regarding the plugin/text-menu
     */
    updateMenu = () => {
        const { value } = this.state
        this.hoverMenu.update({resetMenu: value.isBlurred || value.isEmpty})
        this.plusMenu.update({resetMenu: value.isBlurred || !value.blocks.some(node => node.type === 'p')})
    }

    render() {
        const HoverMenu = TextMenu().components.HoverMenu
        const PlusMenu = PlusMenuPlugin().components.PlusMenu
        const AddSectionButton = AddSection().components.AddSectionButton

        return (
            <div className="columns">
                <div className="column" />
                <div className="column is-three-quarters">
                    <div style={{marginTop: '2rem'}}>
                        <HoverMenu
                            ref={menu => (this.hoverMenu = menu)}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <PlusMenu
                            ref={menu => (this.plusMenu = menu)}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <SlateEditor
                            autoFocus
                            spellCheck
                            schema={schema}
                            plugins={this.plugins}
                            value={this.state.value}
                            onChange={this.onChange}
                            className="slate-editor"
                        />
                        <AddSectionButton
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </div>
                    {
                        process.env.NODE_ENV === 'development' ? (
                            <React.Fragment>
                                {/*TODO: remove ugly spacer <3*/}
                                <div style={{height: '500px'}} />
                                <DocumentViewer doc={this.state.value} />
                            </React.Fragment>
                        ) : null
                    }
                </div>
                <div className="column" />
            </div>
        )
    }
}

export default Editor
