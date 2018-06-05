import React, { Component } from "react";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";
import isEqual from "lodash.isequal";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import { addPlugin, selectPlugin } from "./../../actions/plugin";
import { set_page } from "./../../actions/document";

import Plugin from "./../../../models/Plugin";

import AddPlugin from "./../AddPlugin";
import PluginResolver from "edtrio/common/Components/PluginResolver/Editor";

import styles from "./styles.scss";

class Editor extends Component {
    constructor(props) {
        super(props);

        const plugins = Object.values(props.plugin);
        this.id = plugins.length
            ? Math.max(...plugins.map(pl => pl.id)) + 1
            : 1;
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
                id: this.id,
                page: this.props.document.page.active
            },
            options
        );

        this.id += 1;
        this.props.addPlugin(plugin);
    }

    shouldComponentUpdate({ plugin, document }) {
        return (
            !isEqual(this.props.plugin, plugin) ||
            !isEqual(this.props.document, document)
        );
    }

    render() {
        const { page } = this.props.document;

        const lookup = Object.values(this.props.plugin)
            .sort((a, b) => a.slot > b.slot)
            .filter(p => p.page === this.props.document.page.active);

        return (
            <React.Fragment>
                <ReactPaginate
                    previousLabel="Zurück"
                    nextLabel="Weiter"
                    pageRangeDisplayed={3}
                    pageCount={page.count + 1}
                    onPageChange={this.props.changePage}
                    containerClassName={styles.pagination}
                    activeClassName={styles.paginate_active}
                />

                <div className={styles.editor}>
                    {lookup.map(plugin => {
                        return (
                            !plugin.parent && (
                                <PluginResolver
                                    plugin={plugin.name}
                                    key={plugin.id}
                                >
                                    {Module => <Module id={plugin.id} />}
                                </PluginResolver>
                            )
                        );
                    })}
                </div>

                <AddPlugin addPlugin={name => this._addPlugin(name)} />
            </React.Fragment>
        );
    }

    static propTypes = {
        plugin: PropTypes.object.isRequired,
        document: PropTypes.object.isRequired,
        addPlugin: PropTypes.func.isRequired,
        changePage: PropTypes.func.isRequired
    };
}

const mapStateToProps = ({ plugin, document }) => ({
    plugin: plugin.lookup,
    document
});

const mapDispatchToProps = dispatch => ({
    addPlugin: plugin => {
        dispatch(batchActions([addPlugin(plugin), selectPlugin(plugin.id)]));
    },
    changePage: data => {
        dispatch(set_page(data.selected));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
