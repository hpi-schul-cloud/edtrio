import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./styles.scss";

const modal = document.getElementById("modal");

export default class Modal extends Component {
    shouldComponentUpdate({ open }) {
        return this.props.open !== open;
    }

    render() {
        const { open, onClose } = this.props;

        return ReactDOM.createPortal(
            <div
                className={`${styles.modal_wrapper} ${
                    open
                        ? styles.modal_wrapper_active
                        : styles.modal_wrapper_inactive
                }`}
                onClick={onClose}
            >
                {open && (
                    <div
                        className={`${styles.modal} ${
                            open ? styles.modal_open : ""
                        } `}
                    >
                        {this.props.children}
                    </div>
                )}
            </div>,
            modal
        );
    }

    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        children: PropTypes.node
    };
}
