import React, { Component } from 'react';
import { connect } from "react-redux";
import { DragSource } from "react-dnd";

import {
    Paper,
    Divider,
} from "./../UI";

import Plugin from "./../../models/Plugin";

import { selectPlugin, removePlugin, setContent } from "./../../actions/plugin";

import types from "./../Plugins/types";

import styles from "./styles.scss";

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

export default function makePlugin(WrappedComponent, info, options = {}) {
    const cardSource = {
        beginDrag: () => ({})
    };

    class Module extends Component {
        constructor(props) {
            super(props);
        }
        
        /**
         * Toggles the components `editable` state
         */
        _handleClick(e) {
            e.stopPropagation();

            this.props.selectPlugin(this.props.id);
        }

        _removePlugin() {
            this.props.removePlugin(this.props.id);
        }
        
        render() {
            const { 
                id, 
                dev,
                content,
                editable,
                children,
                saveContent, 

                connectDragSource, 
                connectDragPreview} = this.props;

            return connectDragPreview(
                <>
                    <Paper
                        onMouseDown={(e) => this._handleClick(e)}
                        className={editable ? styles.selected : styles.plugin}>
                        { connectDragSource(<div className={styles.handle}>
                            <span className="material-icons">drag_handle</span>
                        </div>) }
                        <div className={styles.inner}>
                        { dev && <div>
                            <p>{ id }</p>
                        </div>}
                            <WrappedComponent
                                id={id}
                                children={children}
                                editable={editable}
                                content={content}
                                saveContent={(content) => saveContent(id, content)} />
                        </div>
                        {
                            editable && (
                                <div className={styles.toolbar}>
                                    <Divider />
                                    <div className={styles.icons}>
                                        <span className={`material-icons ${styles.action_icon}`} onClick={() => this._removePlugin()}>delete</span>
                                        <span className={`material-icons ${styles.action_icon}`}>hot_tub</span>
                                        <span className={`material-icons ${styles.action_icon}`}>info</span>
                                    </div>
                                </div>
                            )
                        }
                    </Paper>
                </>
            )
        }
    }

    //refactor get_plugin __ all
    const mapStateToProps = ({ plugin, env }, { id }) => {
        const { parent, child } = Plugin.get_plugin(plugin.loaded, id);

        return {
            dev: env === "production" ? false : true, 
            editable: plugin.active === id,
            ...(Number.isInteger(child) ? plugin.loaded[parent].childs[child] : plugin.loaded[parent]),
        }
    };

    const mapDispatchToProps = dispatch => ({
        selectPlugin: id => {
            dispatch(selectPlugin(id));
        },
        removePlugin: id => {
            dispatch(removePlugin(id));
        },
        saveContent: (id, content) => {
            dispatch(setContent(id, content));
        },  
    });

    return connect(mapStateToProps, mapDispatchToProps)(DragSource(types[info.type], cardSource, collect)(Module));
}