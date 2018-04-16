import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { movePlugin } from "edtrio/editor/actions/plugin";

import Plugin from "edtrio/models/Plugin";
import styles from "./styles.scss";

class Slot extends Component {
    render() {
        return <div className={styles.slot} ref={slot => (this.slot = slot)} />;
    }

    static propTypes = {
        slot: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    };
}

const mapDispatchToProps = (dispatch, { id }) => ({
    movePlugin: slot => {
        dispatch(movePlugin(id, slot));
    }
});

export default connect(() => ({}), mapDispatchToProps)(Slot);
