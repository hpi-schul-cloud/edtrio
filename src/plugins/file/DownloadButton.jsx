import React, { Component } from 'react'

import Icon from '../helpers/Icon'


class DownloadButton extends Component {
    render() {
        const { src, ...attributes } = this.props

        return (
            <a
                className="download"
                href={src}
                target="_blank"
                {...attributes}
            >
                <Icon>cloud_download</Icon>
                Download
            </a>
        )
    }
}

export default DownloadButton
