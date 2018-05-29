import React, { Component } from "react";
import PropTypes from "prop-types";

import EditPlugins from "edtrio/plugins/plugins.edit";

import MissingPlugin from "edtrio/plugins/MissingPlugin";

const allEditPlugins = EditPlugins.reduce(
    (acc, { info, Plugin }) => ({
        ...acc,
        [info.name]: Plugin
    }),
    {}
);

const allPlugins = EditPlugins.reduce((acc, { info }) => [...acc, info], []);

export default class PluginResolver extends Component {
    constructor(props) {
        super(props);

        this.allPlugins = allEditPlugins;
    }
    /**
     * Resolves a plugin by type
     * @param {string} plugin Name of the plugin to be resolved
     * @returns {plugin} Resolved plugin or `ErrorPlugin` if none was found
     */
    resolvePlugin(name) {
        return this.allPlugins[name] || MissingPlugin;
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

    static allPlugins = allPlugins;
}
