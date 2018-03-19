import React, { Component } from 'react'
import { connect } from "react-redux";

import { 
    addPlugin,
    selectPlugin,
} from "./../../actions/plugin";

import Plugin from "./../../models/Plugin";

import AddPlugin from './../AddPlugin'

//import TextPlugin from './plugins/TextPlugin'
import DummyPlugin from './../Plugins/DummyPlugin';
import LayoutPlugin from "./../Plugins/LayoutPlugin";
import MissingPlugin from './../Plugins/MissingPlugin';
import LinePlugin from "./../Plugins/LinePlugin";

import styles from "./styles.scss";

class Editor extends Component {
    constructor(props) {
        super(props)

        //Component in Plugin.Plugin
        this.pluginMapping = [
            DummyPlugin,
            LayoutPlugin,
            LinePlugin,
        ]

        this.state = {
            addPluginOpen: false,
        }
    }
   
    /**
     * Resolves a plugin by type
     * @param {string} plugin Name of the plugin to be resolved
     * @returns {plugin} Resolved plugin or `ErrorPlugin` if none was found
     */
    _resolvePlugin(plugin) {
        if(Object.keys(plugin).length > 0) {
            return (this.pluginMapping.find(({ info }) => info.name == plugin.name ) || MissingPlugin).Plugin;
        } 
    }

    /**
     * Add a plugin to the current document by name
     * @param {string} name Name to be resolved via this.pluginMapping
     */
    _addPlugin({ name, type }) {
        const plugin = new Plugin(name, type);

        this.props.addPlugin(plugin);
        this.props.selectPlugin(plugin.id);
    }

    render() {
        const { loaded } = this.props.plugin;
        const { addPluginOpen } = this.state;

        return (
            <React.Fragment>
                <div className={styles.editor}>
                    {loaded.map((plugin) => {
                        const Module = this._resolvePlugin(plugin);

                        return (<Module
                                    key={plugin.id}
                                    id={plugin.id} 
                                    children={Array.from(plugin.childs, (el) => this._resolvePlugin(el))}/>)
                    })}
                </div>
                
                <AddPlugin
                    open={addPluginOpen}
                    allPlugins={this.pluginMapping}
                    addPlugin={(name) => this._addPlugin(name)} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    addPlugin: plugin => {
        dispatch(addPlugin(plugin));
    },
    selectPlugin: id => {
        dispatch(selectPlugin(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
