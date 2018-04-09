import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import DropSlot from "./DropSlot";

import styles from "./styles.scss";

import Plugins from "./../index";

class LayoutPlugin extends Component {
    constructor(props) {
        super(props);

        this.pluginMapping = Plugins.filter(({ info }) => info.name !== "Missing Plugin");
    }

    _resolvePlugin(plugin) {
        return (this.pluginMapping.find(({ info }) => info.name === plugin.name ) || MissingPlugin).Plugin;
    }

    render() {
        const { id, childs, options } = this.props;

        const First  = childs[0] ? this._resolvePlugin(childs[0]) : null;
        const Second = childs[1] ? this._resolvePlugin(childs[1]) : null;

        return (
            <div className={styles.layout_wrapper} >
                <div className={styles.placeholder} >
                    { First
                        ? <First id={childs[0].id} options={options}/>
                        : <DropSlot id={this.props.id} slot={0}/>
                    }
                </div>
                <div className={styles.placeholder}>
                    { Second
                        ? <Second id={childs[1].id} options={options}/>
                        : <DropSlot id={this.props.id} slot={1}/>
                    }
                </div>
            </div>
        )
    }

    static propTypes = {
        options: PropTypes.shape({
            allowChildRearrangement: PropTypes.bool,
        }),
        childs: PropTypes.array.isRequired,
        id : PropTypes.number.isRequired,
    }
}


const mapStateToProps = ({ plugin }, { id }) => {
    const { childs } = plugin.lookup[id];

    return {
        options: plugin.lookup[id].options,
        childs: childs.map(id => plugin.lookup[id]),
    };
};

export default connect(mapStateToProps)(LayoutPlugin);