import React, { Component } from "react";
import PropTypes from "prop-types";

import ViewPlugins from "edtrio/plugins/plugins.view";

import MissingPlugin from "edtrio/plugins/MissingPlugin";

const allPlugins = ViewPlugins.reduce(
    (acc, { info, Plugin }) => ({
        ...acc,
        [info.name]: Plugin
    }),
    {}
);

export default class PluginResolver extends Component {
    resolvePlugin(name) {
        return allPlugins[name] || MissingPlugin;
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { plugin } = this.props;

        if (plugin) {
            return this.props.children(this.resolvePlugin(plugin));
        }

        return this.props.children(false);
    }

    static propTypes = {
        children: PropTypes.func.isRequired,
        plugin: PropTypes.string.isRequired
    };
}
