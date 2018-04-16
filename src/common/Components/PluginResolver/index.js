import React, { Component } from "react";
import PropTypes from "prop-types";

import Plugins from "edtrio/plugins";
import MissingPlugin from "edtrio/plugins/MissingPlugin";

const hidePlugins = ["Missing Plugin", "DropSlot"];

const allPlugins = Plugins.filter(
    ({ info }) => !hidePlugins.includes(info.name)
).reduce(
    (acc, { info, Plugin }) => ({
        ...acc,
        [info.name]: Plugin
    }),
    {}
);

export default class PluginResolver extends Component {
    /**
     * Resolves a plugin by type
     * @param {string} plugin Name of the plugin to be resolved
     * @returns {plugin} Resolved plugin or `ErrorPlugin` if none was found
     */
    resolvePlugin(name) {
        return allPlugins[name] || MissingPlugin;
    }

    shouldComponentUpdate(nextProps) {
        return this.props.plugin !== nextProps.plugin;
    }

    render() {
        const { plugin } = this.props;

        if (plugin) {
            return this.props.children(this.resolvePlugin(plugin));
        }

        return this.props.children(false);
    }

    static defaultProps = {
        plugin: ""
    };

    static propTypes = {
        children: PropTypes.func.isRequired,
        plugin: PropTypes.string
    };

    static allPlugins = Plugins.filter(
        ({ info }) => !hidePlugins.includes(info.name)
    );
}
