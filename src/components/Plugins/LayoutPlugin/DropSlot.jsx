import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DropTarget } from "react-dnd";

import { movePlugin } from "./../../../actions/plugin";

import Plugin from "./../../../models/Plugin";
import styles from "./styles.scss";

const accepted_types = Object.values(Plugin.TYPES).filter(type => type !== Plugin.TYPES["GRID"]);

const collect_drop = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
});

const cardTarget = {
    drop: (props) => {
        props.movePlugin(props.slot);
    }
};

class Slot extends Component {
    render() {
        const { connectDropTarget } = this.props;

        return connectDropTarget(
            <div className={styles.slot}></div>
        )
    }

    static propTypes = {
        slot : PropTypes.number.isRequired,
        id   : PropTypes.number.isRequired,
    }
}

const mapDispatchToProps = (dispatch, { id }) => ({
    movePlugin: (slot) => {
        dispatch(movePlugin(id, slot));
    },
});

export default connect(() => ({}), mapDispatchToProps)(DropTarget(accepted_types, cardTarget, collect_drop)(Slot));