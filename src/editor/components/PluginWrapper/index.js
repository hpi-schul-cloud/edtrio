import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';

import throttle from 'lodash.throttle';
import isEqual from 'lodash.isequal';
import flow from 'lodash.flow';

import { Paper, Divider } from 'x-editor/UI';

import Plugin from 'x-editor/models/Plugin';

import {
    selectPlugin,
    removePlugin,
    setContent
} from 'x-editor/editor/actions/plugin';

import styles from './styles.scss';

import { makeDevMode, makeEditable, makePluginProps } from './selectors';

const accepted_types = Object.values(Plugin.TYPES);
const cardTarget = {
    drop: (props, monitor, component) => {
        if (monitor.didDrop()) {
            return;
        }

        console.log('drop');
    },
    canDrop: ({ editable }) => !editable
};
const collectDrop = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
});

const cardSource = {
    beginDrag: () => ({})
};
const collectDrag = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});

export default function makePlugin(WrappedComponent, info, options = {}) {
    class Module extends Component {
        constructor(props) {
            super(props);

            this.state = {
                highlight: ''
            };
        }

        /**
         * Toggles the components `editable` state
         */
        _handleClick(e) {
            e.stopPropagation();

            this.props.selectPlugin();
        }

        _removePlugin() {
            this.props.removePlugin();
        }

        _getHoverPosition({ top, height }, e) {
            const pos = e.clientY - (top + window.scrollY);

            if (pos <= height / 2) {
                this.setState({
                    highlight: styles.top_highlight
                });
            } else {
                this.setState({
                    highlight: styles.bottom_highlight
                });
            }
        }

        componentWillUnmount() {
            this.plugin.removeEventListener('dragover', this.getHoverPosition);
        }

        componentDidMount() {
            //preact fix
            //register listeners after mount
            const {
                connectDropTarget,
                connectDragPreview,
                connectDragSource
            } = this.props;

            flow(connectDropTarget, connectDragPreview)(this.plugin);

            connectDragSource(this.handle);

            this._getHoverPosition = this._getHoverPosition.bind(
                this,
                this.plugin.getBoundingClientRect()
            );
            this.plugin.addEventListener(
                'dragover',
                throttle(this._getHoverPosition, 100)
            );
        }

        componentWillReceiveProps({ isOver, canDrop }) {
            this.setState({
                highlight: isOver && canDrop ? this.state.highlight : ''
            });
        }

        shouldComponentUpdate(nextProps, nextState) {
            return !(
                isEqual(this.props.content, nextProps.content) &&
                isEqual(this.state.highlight, nextState.highlight) &&
                isEqual(this.props.editable, nextProps.editable)
            );
        }

        render() {
            const {
                id,
                dev,
                content,
                editable,
                saveContent,
                isOver,
                canDrop
            } = this.props;

            const { highlight } = this.state;

            return (
                <div ref={node => (this.wrapper = node)}>
                    {
                        <div
                            ref={node => (this.plugin = node)}
                            className={`${isOver && canDrop ? highlight : ''}`}
                        >
                            <Paper
                                onMouseDown={e => this._handleClick(e)}
                                className={
                                    editable ? styles.selected : styles.plugin
                                }
                            >
                                <div
                                    className={styles.handle}
                                    ref={handle => (this.handle = handle)}
                                >
                                    <span className='material-icons'>
                                        drag_handle
                                    </span>
                                </div>
                                <div className={styles.inner}>
                                    {dev && (
                                        <div>
                                            <span>id: {id}</span>
                                        </div>
                                    )}
                                    <WrappedComponent
                                        id={id}
                                        editable={editable}
                                        content={content}
                                        saveContent={content =>
                                            saveContent(content)
                                        }
                                    />
                                </div>
                                {editable && (
                                    <div className={styles.toolbar}>
                                        <Divider />
                                        <div className={styles.icons}>
                                            <span
                                                className={`material-icons ${
                                                    styles.action_icon
                                                }`}
                                                onClick={() =>
                                                    this._removePlugin()
                                                }
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
                                )}
                            </Paper>
                        </div>
                    }
                </div>
            );
        }
    }

    const makeMapStateToProps = () => {
        const devMode = makeDevMode();
        const isEditable = makeEditable();
        const getContent = makePluginProps();

        const mapStateToProps = (state, props) => {
            return {
                dev: devMode(state),
                editable: isEditable(state, props),
                content: getContent(state, props)
            };
        };

        return mapStateToProps;
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
        }
    });

    return flow(
        DragSource(Plugin.TYPES[info.type], cardSource, collectDrag),
        DropTarget(accepted_types, cardTarget, collectDrop),
        connect(makeMapStateToProps, mapDispatchToProps)
    )(Module);
}
