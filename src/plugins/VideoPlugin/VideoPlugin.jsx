import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

const youtubeR = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/m;
const vimeoR = /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|)(\d+)(?:|\/\?)/;

class VideoPlugin extends Component {
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
        const { isEditable, saveContent } = this.props;

        return (
            <div className={styles.video_wrapper}>
                <div className={styles.iframe_wrapper}>
                    <iframe
                        src={this.state.embedURL}
                        frameBorder="0"
                        allowFullScreen
                    />
                </div>
                <div>
                    <input
                        className={styles.video_input}
                        autoFocus={true}
                        type="url"
                        name="url"
                        onInput={e => this.handleChange(e)}
                        disabled={!isEditable}
                        placeholder="Gib eine Youtube URL ein"
                    />
                </div>
            </div>
        );
    }

    handleChange(e) {
        const [,, id] = youtubeR.exec(e.target.value);

        this.setState(
            {
                embedURL: `http://www.youtube.com/embed/${id}`
            },
            () => this.props.saveContent(this.state)
        );
    }

    static propTypes = {
        // fuer Linting
        isEditable: PropTypes.bool,
        content: PropTypes.object,
        saveContent: PropTypes.func
    };
}

export default VideoPlugin;
