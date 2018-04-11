import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';


class Collapsible extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: props.isExpanded | false
        };
    }

    toggleExpansion(e) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    render() {
        const { title, children } = this.props;

        return (
            <section
                className={styles.accordion_wrapper}>
                <div
                    className={styles.accordion_title}
                    onClick={this.toggleExpansion.bind(this)}>
                    <i className="material-icons">{this.state.isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</i>
                    <span>{title}</span>
                </div>
                {this.state.isExpanded ? <div className={styles.accordion_inner}>{children}</div> : null}
            </section>
        )
    }
}

Collapsible.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    isExpanded: PropTypes.boolean,
}

export default Collapsible