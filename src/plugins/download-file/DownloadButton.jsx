import React, { Component } from 'react'

import Icon from '../helpers/Icon'


class DownloadButton extends Component {
    render() {
        const { src, children, ...attributes } = this.props

        //TODO: the children shouldnt be in here but crashes otherwise
        return (
            <a
                className="download"
                href={src}
                target="_blank"
                {...attributes}
            >
                <Icon>cloud_download</Icon>
                Download
                {children}
            </a>
        )
    }
}

export default DownloadButton
