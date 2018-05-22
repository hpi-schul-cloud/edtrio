import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./../styles.scss";

import PluginResolver from "edtrio/common/Components/PluginResolver/Viewer";

const LayoutPlugin = props => {
    const { id, childs, options } = props;

    return (
        <div className={styles.layout_wrapper}>
            <div className={styles.placeholder}>
                <PluginResolver plugin={childs[0].name}>
                    {First => {
                        return First ? (
                            <First
                                id={childs[0].id}
                                content={childs[0].content}
                                options={options}
                                isEditable={false}
                            />
                        ) : (
                            <p>Leer</p>
                        );
                    }}
                </PluginResolver>
            </div>
            <div className={styles.placeholder}>
                <PluginResolver plugin={childs[1].name}>
                    {Second => {
                        return Second ? (
                            <Second
                                id={childs[1].id}
                                options={options}
                                content={childs[1].content}
                                isEditable={false}
                            />
                        ) : (
                            <p>Leer</p>
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

export default LayoutPlugin;
