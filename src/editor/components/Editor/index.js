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
import TopBar from "./../TopBar";

import styles from "./styles.scss";

class Editor extends Component {
    constructor(props) {
        super(props);

        const plugins = Object.values(props.plugin);
        this.id = plugins.length
            ? Math.max(...plugins.map(pl => pl.id)) + 1
            : 1;

        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.editor = React.createRef();
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

    handleClickOutside(e) {
        if (!this.editor.current.contains(e.target)) {
            this.props.unselectPlugin();
        }
    }

    shouldComponentUpdate({ plugin, document }) {
        return (
            !isEqual(this.props.plugin, plugin) ||
            !isEqual(this.props.document, document)
        );
    }

    componentDidMount() {
        document.body.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.body.removeEventListener("click", this.handleClickOutside);
    }

    render() {
        const { page } = this.props.document;

        return (
            <div ref={this.editor}>
                <TopBar />

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
                    {this.props.plugin.map(plugin => (
                        <div
                            key={plugin.id}
                            style={{
                                order: plugin.slot
                            }}
                        >
                            <PluginResolver plugin={plugin.name}>
                                {Module => (
                                    <Module
                                        id={plugin.id}
                                        {...plugin.options}
                                    />
                                )}
                            </PluginResolver>
                        </div>
                    ))}
                </div>
                <AddPlugin
                    addPlugin={configuration => this._addPlugin(configuration)}
                />
            </div>
        );
    }

    static propTypes = {
        plugin: PropTypes.array.isRequired,
        document: PropTypes.object.isRequired,
        addPlugin: PropTypes.func.isRequired,
        changePage: PropTypes.func.isRequired,
        unselectPlugin: PropTypes.func.isRequired
    };
}

const mapStateToProps = ({ plugin, document }) => ({
    plugin: Object.values(plugin.lookup)
        .filter(p => p.page === document.page.active)
        .filter(p => !p.parent),
    document
});

const mapDispatchToProps = dispatch => ({
    addPlugin: plugin => {
        dispatch(batchActions([addPlugin(plugin), selectPlugin(plugin.id)]));
    },
    changePage: data => {
        dispatch(set_page(data.selected));
    },
    unselectPlugin: () => {
        dispatch(selectPlugin());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);
