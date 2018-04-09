import React, { Component } from "react";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";
import isEqual from "lodash.isequal";
import PropTypes from "prop-types";

import { addPlugin, selectPlugin } from "./../../actions/plugin";

import Plugin from "./../../../models/Plugin";

import AddPlugin from "./../AddPlugin";

import Plugins from "./../../../plugins";

import styles from "./styles.scss";

class Editor extends Component {
    constructor(props) {
        super(props);

        this.pluginMapping = Plugins.filter(
            ({ info }) => info.name !== "Missing Plugin"
        );

        this.id = 1;
        this._unselectPlugin = this._unselectPlugin.bind(this);
    }

    /**
     * Resolves a plugin by type
     * @param {string} plugin Name of the plugin to be resolved
     * @returns {plugin} Resolved plugin or `ErrorPlugin` if none was found
     */
    _resolvePlugin(plugin) {
        return (
            this.pluginMapping.find(({ info }) => info.name === plugin.name) ||
            MissingPlugin
        ).Plugin;
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
                    {lookup.map(plugin => {
                        const Module = this._resolvePlugin(plugin);

                        return (
                            !plugin.parent && (
                                <Module key={plugin.id} id={plugin.id} />
                            )
                        );
                    })}
                </div>

                <AddPlugin
                    allPlugins={this.pluginMapping}
                    addPlugin={name => this._addPlugin(name)}
                />
            </React.Fragment>
        );
    }

    static propTypes = {
        plugin: PropTypes.object.isRequired,
        addPlugin: PropTypes.func.isRequired,
        unselectPlugin: PropTypes.func.isRequired
    };
}

const mapStateToProps = ({ plugin }) => ({ plugin: plugin.lookup });

const mapDispatchToProps = dispatch => ({
    addPlugin: plugin => {
        dispatch(batchActions([addPlugin(plugin), selectPlugin(plugin.id)]));
    },
    unselectPlugin: () => {
        dispatch(selectPlugin());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
