import ReactQuill from "react-quill";

import React, { Component } from "react";
import PropTypes from "prop-types";

class TextPlugin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            visible: false
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
        });
    }

    handleChange(value) {
        this.setState({ text: value }, () =>
            this.props.saveContent({ text: this.state.text })
        );
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const { isEditable } = this.props;
        const { visible } = this.state;

        return (
            <>
                <link
                    rel="stylesheet"
                    href="//cdn.quilljs.com/1.2.6/quill.snow.css"
                    type="text/css"
                    onLoad={() => this.setState({ visible: true })}
                />

                {isEditable &&
                    visible && (
                        <ReactQuill
                            value={this.state.text}
                            onChange={e => this.handleChange(e)}
                        />
                    )}

                {!isEditable && (
                    <div
                        dangerouslySetInnerHTML={{ __html: this.state.text }}
                    />
                )}
            </>
        );
    }
}

TextPlugin.propTypes = {
    isEditable: PropTypes.bool.isRequired,
    content: PropTypes.object,
    saveContent: PropTypes.func.isRequired
};

export default TextPlugin;
