import React, { Component } from "react";
import { connect } from "react-redux";
import { DragSource, DropTarget } from "react-dnd";
import PropTypes from "prop-types";

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
    movePlugin,
    toggleVisible
} from "edtrio/editor/actions/plugin";

import styles from "./styles.scss";

const TOP = 0;
const BOTTOM = 1;
const HIGHLIGHT_STYLES = [styles.top_highlight, styles.bottom_highlight];

const accepted_types = Object.values(Plugin.TYPES);

const cardSource = {
    beginDrag: () => ({}),
    endDrag: (props, monitor) => {
        const result = monitor.getDropResult();

        if (!result) return;

        if (has(result, "id")) props.movePlugin(result.id, result.position);
    }
};
const collectDrag = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});

const cardTarget = {
    drop: ({ id }, monitor, component) => {
        if (monitor.didDrop()) {
            return {};
        }

        return {
            id,
            position: component.decoratedComponentInstance.state.highlight
        };
    },
    canDrop: ({ editable }) => !editable
};

const collectDrop = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
});

const tool_menu = ["none", "block"];

export default function makePlugin(WrappedComponent, info) {
    class Module extends Component {
        constructor(props) {
            super(props);

            this.state = {
                highlight: null
            };

            this.handle = React.createRef();
            this.wrapper = React.createRef();
            this.plugin = React.createRef();

            this.hoverListener = null;
        }

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
                    highlight: TOP
                });
            } else {
                this.setState({
                    highlight: BOTTOM
                });
            }
        }

        componentWillUnmount() {
            if (this.props.options.allowChildRearrangement) {
                this.plugin.current.removeEventListener(
                    "dragover",
                    this.hoverListener
                );
            }
        }

        componentDidUpdate(prevProps) {
            if (
                this.props.plugin.slot !== prevProps.plugin.slot &&
                this.props.options.allowChildRearrangement
            ) {
                this.getHoverPosition = throttle(
                    this._getHoverPosition.bind(
                        this,
                        this.plugin.current.getBoundingClientRect()
                    ),
                    40
                );
            }
        }

        componentDidMount() {
            const {
                connectDropTarget,
                connectDragPreview,
                connectDragSource
            } = this.props;

            flow(
                connectDropTarget,
                connectDragPreview
            )(this.plugin.current);

            connectDragSource(this.handle.current);

            if (this.props.options.allowChildRearrangement) {
                this.getHoverPosition = throttle(
                    this._getHoverPosition.bind(
                        this,
                        this.plugin.current.getBoundingClientRect()
                    ),
                    40
                );

                this.hoverListener = e => this.getHoverPosition(e);

                this.plugin.current.addEventListener(
                    "dragover",
                    this.hoverListener
                );
            }
        }

        shouldComponentUpdate(nextProps, nextState) {
            return !(
                isEqual(this.props.plugin, nextProps.plugin) &&
                isEqual(this.state.highlight, nextState.highlight) &&
                isEqual(this.props.editable, nextProps.editable)
            );
        }

        render() {
            const {
                id,
                dev,
                plugin,
                editable,
                saveContent,
                isOver,
                canDrop,
                initialState
            } = this.props;

            return (
                <div
                    ref={this.wrapper}
                    onMouseDown={e => this._handleClick(e)}
                    className={plugin.visible ? "" : styles.visible_off}
                >
                    {
                        <div
                            ref={this.plugin}
                            className={`${
                                isOver && canDrop
                                    ? HIGHLIGHT_STYLES[this.state.highlight]
                                    : ""
                            }`}
                        >
                            <Paper
                                className={
                                    editable ? styles.selected : styles.plugin
                                }
                            >
                                <div
                                    className={styles.handle}
                                    ref={this.handle}
                                >
                                    <span className="material-icons">
                                        drag_handle
                                    </span>
                                </div>
                                <div className={styles.inner}>
                                    <WrappedComponent
                                        id={id}
                                        isEditable={editable}
                                        isViewMode={false}
                                        initialState={initialState}
                                        content={plugin.content}
                                        saveContent={content =>
                                            saveContent(content)
                                        }
                                    />
                                </div>
                                <div
                                    className={styles.toolbar}
                                    style={{
                                        display: tool_menu[Number(editable)]
                                    }}
                                >
                                    <Divider />
                                    <div className={styles.icons}>
                                        <span
                                            className={`material-icons ${
                                                styles.action_icon
                                            }`}
                                            onClick={() => this._removePlugin()}
                                        >
                                            delete
                                        </span>
                                        <span
                                            className={`material-icons ${
                                                styles.action_icon
                                            }`}
                                            onClick={this.props.toggleVisible}
                                        >
                                            {plugin.visible
                                                ? "visibility"
                                                : "visibility_off"}
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
            );
        }

        static propTypes = {
            selectPlugin: PropTypes.func.isRequired,
            removePlugin: PropTypes.func.isRequired,
            saveContent: PropTypes.func.isRequired,
            toggleVisible: PropTypes.func.isRequired,

            dev: PropTypes.bool.isRequired,
            editable: PropTypes.bool.isRequired,
            plugin: PropTypes.object,
            connectDropTarget: PropTypes.func.isRequired,
            connectDragPreview: PropTypes.func.isRequired,
            connectDragSource: PropTypes.func.isRequired,
            isOver: PropTypes.bool.isRequired,
            canDrop: PropTypes.bool.isRequired,
            id: PropTypes.number.isRequired,
            options: PropTypes.shape({
                allowChildRearrangement: PropTypes.bool
            }),
            initialState: PropTypes.object
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
            editable: plugin.active === id,
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
        movePlugin: (drop, pos) => {
            dispatch(movePlugin(drop, pos, true));
        },
        toggleVisible: () => {
            dispatch(toggleVisible(id));
        }
    });

    return flow(
        DragSource(Plugin.TYPES[info.type], cardSource, collectDrag),
        DropTarget(accepted_types, cardTarget, collectDrop),
        connect(
            mapStateToProps,
            mapDispatchToProps
        )
    )(Module);
}
