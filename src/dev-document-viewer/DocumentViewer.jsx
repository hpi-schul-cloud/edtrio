import React, { Component } from 'react'


class DocumentViewer extends Component {
    render() {
        const { doc } = this.props

        return (
            <aside className="column documentViewer-wrapper">
                <h2>Internal document state</h2>
                <hr />
                <pre>
                    <code>
                        { JSON.stringify(doc, null, 4) }
                    </code>
                </pre>
            </aside>
        )
    }
}

export default DocumentViewer
