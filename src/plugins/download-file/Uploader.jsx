import React, { Component } from 'react'

import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import { DashboardModal } from '@uppy/react'

class Uploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }

    this.uppy = Uppy({
      meta: { type: 'avatar' },
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: true
    })

    this.uppy.use(Tus, { endpoint: 'https://master.tus.io/files/' })

    this.uppy.on('complete', result => {
      const url = result.successful[0].uploadURL
      console.log(`WE DONE! ${url}`)
    })
  }

  render() {
    return (
      <div>
        <link
          href="https://transloadit.edgly.net/releases/uppy/v0.27.1/dist/uppy.min.css"
          rel="stylesheet"
        />
        <button className="button" onClick={this.handleModalClick}>
          {this.state.open ? 'Close dashboard' : 'Upload files'}
        </button>
        <DashboardModal
          uppy={this.uppy}
          open={this.state.open}
          target={document.body}
          onRequestClose={() => this.setState({ open: false })}
        />
      </div>
    )
  }

  handleModalClick = () => {
    this.setState({
      open: !this.state.open
    })
  }
}

export default Uploader
