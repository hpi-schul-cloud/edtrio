import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DropSlot from "edtrio/plugins/DropSlot/DropSlot";

import styles from "./../styles.scss";

import PluginResolver from "edtrio/common/Components/PluginResolver";

const LayoutPlugin = props => {
    const { id, childs, options } = props;

    return (
        <div className={styles.layout_wrapper}>
            <div className={styles.placeholder}>
                <PluginResolver mode="edit" plugin={childs[0].name}>
                    {First => {
                        return First ? (
                            <First id={childs[0].id} options={options} />
                        ) : (
                            <DropSlot id={props.id} slot={0} />
                        );
                    }}
                </PluginResolver>
            </div>
            <div className={styles.placeholder}>
                <PluginResolver mode="edit" plugin={childs[1].name}>
                    {Second => {
                        return Second ? (
                            <Second id={childs[1].id} options={options} />
                        ) : (
                            <DropSlot id={props.id} slot={1} />
                        );
                    }}
                </PluginResolver>
            </div>
        </div>
    );
};

LayoutPlugin.propTypes = {
    options: PropTypes.shape({
        allowChildRearrangement: PropTypes.bool
    }),
    childs: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired
};

const mapStateToProps = ({ plugin }, { id }) => {
    const { childs } = plugin.lookup[id];

    return {
        options: plugin.lookup[id].options,
        childs: [0, 1].map(i => plugin.lookup[childs[i]] || {})
    };
};

export default connect(mapStateToProps)(LayoutPlugin);
