import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

import { movePlugin } from "edtrio/editor/actions/plugin";

import Plugin from "edtrio/models/Plugin";
import styles from "./styles.scss";

const accepted_types = Object.values(Plugin.TYPES).filter(
    type => type !== Plugin.TYPES["LAYOUT"]
);

const collect_drop = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
});

const cardTarget = {
    drop: props => {
        props.movePlugin(props.slot);
    }
};

class Slot extends Component {
    constructor(props) {
        super(props);

        this.slot = React.createRef();
    }

    componentDidMount() {
        const { connectDropTarget } = this.props;

        connectDropTarget(this.slot.current);
    }

    render() {
        return <div className={styles.slot} ref={this.slot} />;
    }

    static propTypes = {
        slot: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        connectDropTarget: PropTypes.func.isRequired
    };
}

const mapDispatchToProps = (dispatch, { id }) => ({
    movePlugin: slot => {
        dispatch(movePlugin(id, slot));
    }
});

export default connect(
    () => ({}),
    mapDispatchToProps
)(DropTarget(accepted_types, cardTarget, collect_drop)(Slot));
