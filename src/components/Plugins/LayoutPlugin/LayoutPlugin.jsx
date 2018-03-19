import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import makePlugin from './../../PluginWrapper';

import DropSlot from "./DropSlot";

import styles from "./styles.scss";
import info   from "./plugin.json";

class LayoutPlugin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, children, childs }  = this.props;

        const First  = children[0] ? children[0] : null;
        const Second = children[1] ? children[1] : null;

        return (
            <div className={styles.layout_wrapper} >
                <div className={styles.placeholder} >
                    { First
                        ? <First id={childs[0].id} />
                        : <DropSlot id={this.props.id} slot={0}/>
                    }
                </div>
                <div className={styles.placeholder}>
                    { Second
                        ? <Second id={childs[1].id}/>
                        : <DropSlot id={this.props.id} slot={1}/>
                    }
                </div>
            </div>
        )
    }

    static defaultProps = {
        children: [null, null],
    }

    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.func),
        id   : PropTypes.string.isRequired,
    }
}


const mapStateToProps = ({ plugin }, { id }) => {

    return {
        childs: plugin.loaded.find(el => el.id === id).childs,
    };
};

export default makePlugin(connect(mapStateToProps)(LayoutPlugin), info);