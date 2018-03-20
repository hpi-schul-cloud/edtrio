import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import makePlugin from './../../PluginWrapper';

import DropSlot from "./DropSlot";

import styles from "./styles.scss";
import info   from "./plugin.json";

import DummyPlugin from './../DummyPlugin';
import MissingPlugin from './../MissingPlugin';
import LinePlugin from "./../LinePlugin";

class LayoutPlugin extends Component {
    constructor(props) {
        super(props);

        //Component in Plugin.Plugin
        this.pluginMapping = [
            DummyPlugin,
            LinePlugin,
        ]
    }

    _resolvePlugin(plugin) {
        return (this.pluginMapping.find(({ info }) => info.name == plugin.name ) || MissingPlugin).Plugin;
    }

    render() {
        const { id, childs } = this.props;

        const First  = childs[0] ? this._resolvePlugin(childs[0]) : null;
        const Second = childs[1] ? this._resolvePlugin(childs[1]) : null;

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
        id   : PropTypes.number.isRequired,
    }
}


const mapStateToProps = ({ plugin }, { id }) => {
    const childs = plugin.lookup[id].childs;

    return {
        childs: childs.map(id => plugin.lookup[id]),
    };
};

export default makePlugin(connect(mapStateToProps)(LayoutPlugin), info);