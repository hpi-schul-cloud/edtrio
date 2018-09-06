import React, { Component } from 'react'
import { Editor as SlateEditor } from 'slate-react'
import { Value, Block } from 'slate'
import schema from './schema'

import TextMenu from './plugins/text-menu'
import PlusMenuPlugin from './plugins/plus-menu'
import CodeBlockPlugin from './plugins/code-block'
import AutoURL from './plugins/auto-url'
import Image from './plugins/image'
import Geogebra from './plugins/geogebra'
import URLHandler from './plugins/url-handler'
import MarkdownShortcuts from './plugins/markdown-shortcuts'
import Title from './plugins/title'
import Iframe from './plugins/iframe'
import DownloadFile from './plugins/download-file'


//TODO: remove
import Uploader from './plugins/download-file/Uploader'


import Icon from './plugins/helpers/Icon'
import Button from './plugins/helpers/Button'
import insertParagraph from './plugins/helpers/insertParagraph'

import DocumentViewer from './dev-document-viewer/DocumentViewer'

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
    }

    /**
     * handles clicks on the codeblock button and
     * forwards them accordingly to plugins/code-block
     */
    onClickCodeButton = event => {
        event.preventDefault()

        const { value } = this.state
        const change = value.change()

        const isCode = change.value.blocks.some(block => block.type === 'code')
        change.setBlocks(isCode ? 'p' : 'code')

        this.onChange(change)
    }

    /**
     * handles clicks on the imageblock button and
     * forwards them accordingly to plugins/image
     */
    onClickImageButton = event => {
        const { insertImage } = Image().changes

        event.preventDefault()
        const src = window.prompt('Enter the URL of the image:')
        if (!src) return

        const change = this.state.value.change().call(insertImage, src).call(insertParagraph)

        this.onChange(change)
    }

    onClickIframeButton = event => {
        const { insertIframe } = Iframe().changes

        event.preventDefault()
        const src = window.prompt('Enter the URL of the iframe:')
        if (!src) return

        const change = this.state.value.change().call(insertIframe, src).call(insertParagraph)

        this.onChange(change)
    }

    onClickGeogebraButton = event => {
        const { insertGeogebraNode } = Geogebra().changes

        event.preventDefault()
        const id = window.prompt('Enter the geogebra id:') || 'RHYH3UQ8'
        if(!id) return

        const change = this.state.value.change().call(insertGeogebraNode, id).call(insertParagraph)

        this.onChange(change)
    }

    onClickNewSectionButton = event => {
        /*
        event.preventDefault()
        const change = this.state.value.change().yadada
        this.onChange(change)
        */
    }

    render() {
        const HoverMenu = TextMenu().components.HoverMenu
        const PlusMenu = PlusMenuPlugin().components.PlusMenu

        return (
            <div className="container">
                <Uploader />
                <div className="">
                    <Button
                        reversed
                        active={false}
                        onMouseDown={this.onClickCodeButton}
                    >
                        <Icon>code</Icon>
                    </Button>
                    <Button
                        reversed
                        active={false}
                        onMouseDown={this.onClickImageButton}
                    >
                        <Icon>photo</Icon>
                    </Button>
                    <Button
                        reversed
                        active={false}
                        onMouseDown={this.onClickIframeButton}
                    >
                        <Icon>picture_in_picture</Icon>
                    </Button>
                    <Button
                        reversed
                        active={false}
                        onMouseDown={this.onClickGeogebraButton}
                    >
                        <Icon>functions</Icon>
                    </Button>
                </div>
                <div className="">
                    <HoverMenu
                        ref={menu => (this.hoverMenu = menu)}
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                    {/*<PlusMenu
                        ref={menu => (this.plusMenu = menu)}
                        value={this.state.value}
                        onChange={this.onChange}
                    />*/}
                    <SlateEditor
                        autoFocus
                        spellCheck
                        schema={schema}
                        plugins={this.plugins}
                        value={this.state.value}
                        onChange={this.onChange}
                        placeholder="You can start typing..."
                        className="slate-editor"
                    />
                    <button
                        className="button"
                        onMouseDown={this.onClickNewSectionButton}
                    >
                        <span className="icon">
                            <i className="fas fa-plus"></i>
                        </span>
                        <span>Add section</span>
                    </button>
                </div>
                {
                    process.env.NODE_ENV === 'development' ? (
                        <DocumentViewer doc={this.state.value} />
                    ) : null
                }
            </div>
        )
    }
}

export default Editor
