import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import isEqual from "lodash.isequal";

class VideoPlugin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputURL: '',
            embedURL: ''
        }
    }

    shouldComponentUpdate({ editable }, nextState) {
        return editable && !isEqual(this.state, nextState);
    }

    componentDidMount() {

        this.setState({
            ...this.props.content,
        });

    }

    render() {

        const { editable, saveContent } = this.props;

        return (
            <React.Fragment>
                <div>unstyled</div>
                <div>{`Editable: ${editable}`}</div>
                <input
                    autoFocus={true}
                    type="url"
                    name="url"
                    value={this.state.inputUrl}
                    onChange={(e) => this.handleChange(e)} />
                <iframe
                    width="420"
                    height="315"
                    src={this.state.embedURL}
                    frameborder="0"
                    allowfullscreen>
                </iframe>
            </React.Fragment>
        )
    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            var arr = this.state.inputURL.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/gm);
            var id = arr[0];

            this.state.embedURL = 'http://www.youtube.com/embed/' + id;

            this.props.saveContent(this.state);
        });
    }

    static propTypes = { // fuer Linting
        editable: PropTypes.bool,
        content : PropTypes.object,
        saveContent: PropTypes.func,
    };
}

export default VideoPlugin