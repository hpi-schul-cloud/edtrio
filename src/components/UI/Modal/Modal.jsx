import React, { Component } from "react";
import PropTypes from 'prop-types';

import styles from "./styles.scss";

//TODO - remove body class on close

export default class Modal extends Component {

    componentWillReceiveProps({ open }) {
        if(open) {
            this.wrapper.classList.remove(`${styles.modal_wrapper_inactive}`);
            this.wrapper.classList.add(`${styles.modal_wrapper_active}`);
        } else {
            this.wrapper.classList.remove(`${styles.modal_wrapper_active}`);
            this.wrapper.classList.add(`${styles.modal_wrapper_inactive}`);
        }

        document.body.classList.toggle(styles.blur);
    }

    render() {
        const { 
            open,
            onClose,
        } = this.props;

        return (
            <>
                { <div 
                    ref={(wrapper) => this.wrapper = wrapper} 
                    className={`${styles.modal_wrapper}`} 
                    onClick={onClose}
                    >

                    { <div className={`${styles.modal} ${open ? styles.modal_open : ""} `}>
                        { this.props.children }
                    </div>  }
                </div>}
            </>
        )
    }

    static defaultProps = {
        open: false,
    }

    static propTypes = {
        open: PropTypes.bool.isRequired,
    }
}