import ReactQuill from 'react-quill'

import React, { Component } from 'react'
import PropTypes from 'prop-types';

class TextPlugin extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    render() {
        const { isEditable/*, saveContent*/ } = this.props;

        if(isEditable) {
            return (
                <ReactQuill value={this.state.text}
                    onChange={this.handleChange} />
            )
        }
        return (
            <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
        )
    }
}

TextPlugin.propTypes = {
    isEditable: PropTypes.bool.isRequired
}

export default TextPlugin