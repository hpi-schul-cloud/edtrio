import React, { Component } from 'react'
import { Editor as SlateEditor } from 'slate-react'
import { Value } from 'slate'

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
                        text: 'A line of text in a paragraph.',
                        },
                    ],
                    },
                ],
            },
        ],
    },
  })


class Editor extends Component {
    // Set the initial value when the app is first constructed.
    state = {
        value: initialValue,
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        this.setState({ value })
    }

    // Render the editor.
    render() {
        return <SlateEditor value={this.state.value} onChange={this.onChange} />
    }
}

export default Editor
