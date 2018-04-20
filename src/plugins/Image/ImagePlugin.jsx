import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";


class ImagePlugin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            embedURL: ""
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
        });
    }

    render() {
        const { isEditable } = this.props;
        const { embedURL } = this.state;

        return (
            <>
                <img src={embedURL}/>
                <input
                    id={styles.imageUrl}
                    autoFocus={true}
                    type="url"
                    name="url"
                    value={embedURL}
                    onInput={e => this.handleChange(e)}
                    disabled={!isEditable}
                    placeholder="Bild URL eingeben"
                />
            </>
        );
    }

    handleChange(e) {
        this.setState(
            {
                embedURL: e.target.value
            },
            () => this.props.saveContent(this.state)
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool,
        content: PropTypes.object,
        saveContent: PropTypes.func
    };
}

export default ImagePlugin;
