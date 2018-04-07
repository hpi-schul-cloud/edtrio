import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';


class Accordion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
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
                onClick={this.toggleExpansion.bind(this)}
                className={`${styles.accordion_wrapper}`}>
                <div className={`${styles.accordion_title}`}>
                    <i className="material-icons">{this.state.isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</i>
                    <span>{title}</span>
                </div>
                {this.state.isExpanded ? <div className={`${styles.accordion_inner}`}>{children}</div> : null}
            </section>
        )
    }
}

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default Accordion