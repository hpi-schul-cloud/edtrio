import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { AppBar } from "edtrio/UI";

import { set_title } from "./../../actions/document";

import styles from "./styles.scss";

class TopBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.titleInput = React.createRef();
    }

    setActive(active = true) {
        this.setState(
            () => {
                return {
                    active
                };
            },
            () => {
                if (active) this.titleInput.current.focus();
            }
        );
    }

    render() {
        const { active } = this.state;

        return (
            <AppBar
                title={
                    <div
                        onClick={e => this.setActive()}
                        className={styles.title}
                    >
                        {active ? (
                            <form
                                onSubmit={e => {
                                    e.preventDefault();

                                    this.setActive(false);
                                }}
                            >
                                <input
                                    ref={this.titleInput}
                                    type="text"
                                    onChange={this.props.changeTitle}
                                    value={this.props.title}
                                    onBlur={e => this.setActive(false)}
                                />
                            </form>
                        ) : (
                            <h2>{this.props.title}</h2>
                        )}
                    </div>
                }
            />
        );
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        changeTitle: PropTypes.func.isRequired
    };
}

const mapStateToProps = ({ document }) => ({
    title: document.title
});

const mapDispatchToProps = dispatch => ({
    changeTitle(e) {
        dispatch(set_title(e.target.value));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopBar);
