import React, { Component } from 'react'

import Icon from '../helpers/Icon'


class DownloadButton extends Component {
    render() {
        const { src, selected, ...attributes } = this.props

        return (
            <a
                className={`download plugin-wrapper ${selected ? 'selected' : ''}`}
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
