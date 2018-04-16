import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { SortableElement, SortableHandle, arrayMove } from "react-sortable-hoc";

import throttle from "lodash.throttle";
import isEqual from "lodash.isequal";
import flow from "lodash.flow";

import has from "has";

import { Paper, Divider } from "edtrio/UI";

import Plugin from "edtrio/models/Plugin";

import {
    selectPlugin,
    removePlugin,
    setContent,
    movePlugin
} from "edtrio/editor/actions/plugin";

import styles from "./styles.scss";

const DragHandle = SortableHandle(() => (
    <div className={styles.handle}>
        <span className="material-icons">drag_handle</span>
    </div>
));

const tool_menu = ["none", "block"];

export default function makePlugin(WrappedComponent, info) {
    const WrappedPlugin = SortableElement(
        ({
            isEditable,
            saveContent,
            id,
            plugin,
            dev,
            selectPlugin,
            removePlugin
        }) => (
            <div onMouseDown={selectPlugin}>
                {
                    <div>
                        <Paper
                            className={
                                isEditable ? styles.selected : styles.plugin
                            }
                        >
                            <DragHandle />

                            <div className={styles.inner}>
                                {dev && (
                                    <div>
                                        <span>id: {id}</span>
                                    </div>
                                )}
                                <WrappedComponent
                                    id={id}
                                    isEditable={isEditable}
                                    content={plugin.content}
                                    saveContent={content =>
                                        saveContent(content)
                                    }
                                />
                            </div>
                            <div
                                className={styles.toolbar}
                                style={{
                                    display: tool_menu[Number(isEditable)]
                                }}
                            >
                                <Divider />
                                <div className={styles.icons}>
                                    <span
                                        className={`material-icons ${
                                            styles.action_icon
                                        }`}
                                        onClick={removePlugin}
                                    >
                                        delete
                                    </span>
                                    <span
                                        className={`material-icons ${
                                            styles.action_icon
                                        }`}
                                    >
                                        hot_tub
                                    </span>
                                    <span
                                        className={`material-icons ${
                                            styles.action_icon
                                        }`}
                                    >
                                        info
                                    </span>
                                </div>
                            </div>
                        </Paper>
                    </div>
                }
            </div>
        )
    );

    class Module extends Component {
        _handleClick(e) {
            e.stopPropagation();

            this.props.selectPlugin();
        }

        _removePlugin() {
            this.props.removePlugin();
        }

        render() {
            const { plugin } = this.props;

            return (
                <WrappedPlugin
                    {...this.props}
                    selectPlugin={e => this._handleClick(e)}
                    removePlugin={() => this._removePlugin()}
                    index={plugin.slot}
                />
            );
        }

        static propTypes = {
            selectPlugin: PropTypes.func.isRequired,
            removePlugin: PropTypes.func.isRequired,
            saveContent: PropTypes.func.isRequired,
            dev: PropTypes.bool.isRequired,
            isEditable: PropTypes.bool.isRequired,
            plugin: PropTypes.object,
            id: PropTypes.number.isRequired,
            options: PropTypes.shape({
                allowChildRearrangement: PropTypes.bool
            })
        };

        static defaultProps = {
            options: {
                allowChildRearrangement: true
            }
        };
    }

    const mapStateToProps = ({ plugin, env }, { id }) => {
        return {
            dev: env !== "production",
            isEditable: plugin.active === id,
            plugin: plugin.lookup[id]
        };
    };

    const mapDispatchToProps = (dispatch, { id }) => ({
        selectPlugin: () => {
            dispatch(selectPlugin(id));
        },
        removePlugin: () => {
            dispatch(removePlugin(id));
        },
        saveContent: content => {
            dispatch(setContent(id, content));
        },
        movePlugin: (id, oldIndex, newIndex) => {
            dispatch(movePlugin(id, oldIndex, newIndex));
        }
    });

    return connect(mapStateToProps, mapDispatchToProps)(Module);
}
