import React, { Component } from 'react'
import { Editor as SlateEditor } from 'slate-react'
import { Value } from 'slate'

import DocumentViewerPlugin from './plugins/dev-document-viewer'

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

        this.plugins = [DocumentViewerPlugin]
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    render() {
        return (
            <SlateEditor
                plugins={this.plugins}
                value={this.state.value}
                onChange={this.onChange}
            />
        )
    }
}

export default Editor
