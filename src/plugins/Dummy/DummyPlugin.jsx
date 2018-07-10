import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import { LRSConnector } from "edtrio/utils";

/**
 * Dummy Plugin for testing
 * Does not have any functionality apart from displaying whether it is in edit
 * mode or not.
 * **DEVELOPMENT ONLY**
 */
class DummyPlugin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lx: "XXX",
            ly: "YYY"
        };
    }

    shouldComponentUpdate({ isEditable }, nextState) {
        return isEditable && !isEqual(this.state, nextState);
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
        });
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {
                this.props.saveContent(this.state);
            }
        );
    }

    handleSendLRSStatement() {
        LRSConnector.saveProgressFailed({
            actorId: "d7781057-e3ce-4aa8-8581-72336aa5b73f",
            objectId: "https://bp.schul-cloud.org/courses/59a3c657a2049554a93fec3a/topics/59a6c215a2049554a93fed79/",
            objectName: "Das Juliane",
            courseId: "https://bp.schul-cloud.org/courses/5a79c9fa3c50db0010e0fcd4",
        });
    }

    render() {
        const { isEditable } = this.props;

        return (
            <>
                <div>unstyled</div>
                <h2>Static dummy text plugin</h2>
                <div>{`Editable: ${isEditable}`}</div>
                <input
                    autoFocus={true}
                    type="text"
                    name="lx"
                    value={this.state.lx}
                    onChange={e => this.handleChange(e)}
                />
                <input
                    type="text"
                    name="ly"
                    value={this.state.ly}
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.handleSendLRSStatement()}>Send LRS statement</button>
            </>
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired
        //isPrint: PropTypes.bool,
        //isViewMode: PropTypes.bool,
    };
}

export default DummyPlugin;
