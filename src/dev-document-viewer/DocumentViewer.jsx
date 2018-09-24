import React, { Component } from 'react'

class DocumentViewer extends Component {
  render() {
    const { doc } = this.props

    return (
      <aside className="">
        <hr />
        <h2 className="title is-5">Internal document state</h2>
        <pre>
          <code>{JSON.stringify(doc, null, 4)}</code>
        </pre>
      </aside>
    )
  }
}

export default DocumentViewer
