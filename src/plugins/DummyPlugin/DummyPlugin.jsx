import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import isEqual from "lodash.isequal";

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
            ly: "YYY",
        };
    }

    shouldComponentUpdate({ editable }, nextState) {
        return editable && !isEqual(this.state, nextState);
    }
    
    componentDidMount() {
        this.setState({
            ...this.props.content,
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            this.props.saveContent(this.state);
        });
    }
    
    render() {
        const { editable, saveContent } = this.props;

        return (
            <React.Fragment>
                <div>unstyled</div>
                <h2>Static dummy text plugin</h2>
                <div>{`Editable: ${editable}`}</div>
                <input
                    autoFocus={true}
                    ref={(el) => this.input = el}
                    type="text"
                    name="lx"
                    value={this.state.lx}
                    onChange={(e) => this.handleChange(e)} />
                <input
                    type="text"
                    name="ly"
                    value={this.state.ly}
                    onChange={(e) => this.handleChange(e)} />
            </React.Fragment>
        )
    }

    static defaultProps = {
        editable: false,
    };

    static propTypes = {
        editable: PropTypes.bool,
        content : PropTypes.object,
        saveContent: PropTypes.func,
    };
}

export default DummyPlugin;
