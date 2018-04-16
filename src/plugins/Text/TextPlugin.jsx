import ReactQuill from "react-quill";

import React, { Component } from "react";
import PropTypes from "prop-types";

class TextPlugin extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" }; // You can also pass a Quill Delta here
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
        });
    }

    handleChange(value) {
        this.setState({ text: value }, () =>
            this.props.saveContent(this.state)
        );
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const { isEditable } = this.props;

        if (isEditable) {
            return (
                <ReactQuill
                    value={this.state.text}
                    onChange={e => this.handleChange(e)}
                />
            );
        }
        return <div dangerouslySetInnerHTML={{ __html: this.state.text }} />;
    }
}

TextPlugin.propTypes = {
    isEditable: PropTypes.bool.isRequired,
    content: PropTypes.object,
    saveContent: PropTypes.func.isRequired
};

export default TextPlugin;
