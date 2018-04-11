import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const parseUrlRegex = /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/;

class VideoPlugin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            embedURL: ''
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
                        placeholder="Youtube oder Vimeo URL eingeben"
                    />
                </div>
            </div>
        );
    }

    handleChange(e) {
        const [,,, platform,,, id] = parseUrlRegex.exec(e.target.value);
        
        let embedPrefix = '';

        if(platform.indexOf('youtu') > -1) {
            embedPrefix = 'https://www.youtube.com/embed/';
        } else if (platform.indexOf('vimeo') > -1) {
            embedPrefix = 'https://player.vimeo.com/video/';
        }

        this.setState(
            {
                embedURL: embedPrefix + id
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

export default VideoPlugin;
