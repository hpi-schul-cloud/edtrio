import React, { Component } from "react";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";
import isEqual from "lodash.isequal";
import { SortableContainer } from "react-sortable-hoc";
import PropTypes from "prop-types";

import { addPlugin, selectPlugin, movePlugin } from "./../../actions/plugin";

import Plugin from "./../../../models/Plugin";

import AddPlugin from "./../AddPlugin";
import PluginResolver from "edtrio/common/Components/PluginResolver";

import styles from "./styles.scss";

const SortableList = SortableContainer(({ items }) => (
    <div className={styles.editor}>
        {items.map(plugin => {
            return (
                !plugin.parent && (
                    <PluginResolver plugin={plugin.name} key={plugin.id}>
                        {Module => <Module id={plugin.id} />}
                    </PluginResolver>
                )
            );
        })}
    </div>
));

class Editor extends Component {
    constructor(props) {
        super(props);

        this.id = 1;
        this._unselectPlugin = this._unselectPlugin.bind(this);
    }

    /**
     * Add a plugin to the current document by name
     * @param {string} name Name to be resolved via this.pluginMapping
     */
    _addPlugin({ name, type, options }) {
        const plugin = new Plugin(
            {
                name,
                type,
                id: this.id
            },
            options
        );

        this.id += 1;

        this.props.addPlugin(plugin);
    }

    _unselectPlugin() {
        this.props.unselectPlugin();
    }

    sortPlugins({ oldIndex, newIndex }) {
        this.props.movePlugin(oldIndex, newIndex);
    }

    componentDidMount() {
        this.listener.addEventListener("mousedown", this._unselectPlugin);
    }

    componentWillUnmount() {
        this.listener.removeEventListener("mousedown", this._unselectPlugin);
    }

    shouldComponentUpdate({ plugin }) {
        return !isEqual(this.props.plugin, plugin);
    }

    render() {
        const lookup = Object.values(this.props.plugin).sort(
            (a, b) => a.slot > b.slot
        );

        return (
            <React.Fragment>
                <div
                    className={styles.event_background}
                    ref={listener => (this.listener = listener)}
                />

                <div className={styles.editor}>
                    <SortableList
                        items={lookup}
                        onSortEnd={index => this.sortPlugins(index)}
                        useDragHandle={true}
                    />
                </div>

                <AddPlugin addPlugin={name => this._addPlugin(name)} />
            </React.Fragment>
        );
    }

    static propTypes = {
        movePlugin: PropTypes.func,
        plugin: PropTypes.object.isRequired,
        addPlugin: PropTypes.func.isRequired,
        unselectPlugin: PropTypes.func.isRequired
    };
}

const mapStateToProps = ({ plugin }) => ({
    plugin: plugin.lookup
});

const mapDispatchToProps = dispatch => ({
    addPlugin: plugin => {
        dispatch(batchActions([addPlugin(plugin), selectPlugin(plugin.id)]));
    },
    unselectPlugin: () => {
        dispatch(selectPlugin());
    },
    movePlugin: (oldIndex, newIndex) => {
        dispatch(movePlugin(oldIndex, newIndex));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
