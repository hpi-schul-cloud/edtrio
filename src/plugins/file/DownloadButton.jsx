import React, { Component } from 'react'

import Icon from '../helpers/Icon'


class DownloadButton extends Component {
    render() {
        const { fileURL } = this.props

        return (
            <a
                className="download"
                href={fileURL}
                target="_blank"
            >
                <Icon>cloud_download</Icon>
                Download
            </a>
        )
    }
}

export default DownloadButton
