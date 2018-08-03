import React, { Component } from 'react'
import { Editor as SlateEditor } from 'slate-react'
import { Value } from 'slate'

import DocumentViewer from './dev-document-viewer/DocumentViewer'
import CodeBlockPlugin from './plugins/code-block'

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                    object: 'text',
                    leaves: [
                        {
                        text: 'Start typing...',
                        },
                    ],
                    },
                ],
            },
        ],
    },
})

  class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: initialValue,
        }

        const code = CodeBlockPlugin()
        this.plugins = [
            ...code.plugins
        ]
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    onClickCodeButton = (event) => {
        event.preventDefault()

        const { value } = this.state
        const change = value.change()

        const isCode = change.value.blocks.some(block => block.type === 'code')
        change.setBlocks(isCode ? 'paragraph' : 'code')

        this.onChange(change)
    }

    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className="toolbar">
                        <button onClick={this.onClickCodeButton}>Click me for a codeblock</button>
                    </div>
                    <div className="slate-wrapper">
                        <SlateEditor
                            plugins={this.plugins}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                <DocumentViewer doc={this.state.value} />
            </div>
        )
    }
}

export default Editor
