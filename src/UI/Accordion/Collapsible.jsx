import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

class Collapsible extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: props.isExpanded
        };
    }

    toggleExpansion(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isExpanded !== nextState.isExpanded;
    }

    componentDidMount() {
        const { isExpanded } = this.state;

        if (isExpanded) {
            this.inner.style.height = `${this.inner.scrollHeight}px`;
        }
    }

    componentDidUpdate() {
        const { isExpanded } = this.state;

        if (isExpanded) {
            this.inner.style.height = `${this.inner.scrollHeight}px`;
        } else {
            this.inner.style.height = `0px`;
        }
    }

    render() {
        const { title, children } = this.props;

        const { isExpanded } = this.state;

        return (
            <section className={styles.accordion_wrapper}>
                <div
                    className={styles.accordion_title}
                    onClick={this.toggleExpansion.bind(this)}
                >
                    <i className="material-icons">
                        {this.state.isExpanded
                            ? "keyboard_arrow_down"
                            : "keyboard_arrow_right"}
                    </i>
                    <span>{title}</span>
                </div>
                <div
                    className={styles.accordion_inner}
                    ref={inner => (this.inner = inner)}
                >
                    {children}
                </div>
            </section>
        );
    }
}

Collapsible.defaultProps = {
    isExpanded: false
};

Collapsible.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    isExpanded: PropTypes.bool
};

export default Collapsible;
