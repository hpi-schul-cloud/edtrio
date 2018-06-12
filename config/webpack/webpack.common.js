const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const styles = require("./parts/webpack.style");
const images = require("./parts/webpack.images");

const dev = require("./webpack.dev");
const prod = require("./webpack.prod");

module.exports = (src = {}) => {
    return merge(
        src,
        process.env.NODE_ENV === "production" ? prod() : dev(),
        {
            resolve: {
                alias: {
                    "react-loadable": "@7rulnik/react-loadable"
                }
            },
            plugins: [
                new WebpackShellPlugin({
                    onBuildStart: [`node scripts/generate_plugin_index.js`]
                }),
                new CleanWebpackPlugin(path.join("./public"), {
                    root: path.join(__dirname, "../../")
                }),
                new HtmlWebpackPlugin({
                    chunks: ["edtrio"],
                    filename: "edtrio.html",
                    template: "src/editor/edtrio.html",
                    chunksSortMode: "none"
                }),
                new HtmlWebpackPlugin({
                    chunks: ["viewer"],
                    filename: "viewer.html",
                    template: "src/viewer/viewer.html",
                    chunksSortMode: "none"
                }),
                new ScriptExtHtmlWebpackPlugin({
                    defaultAttribute: "defer"
                }),
                new HardSourceWebpackPlugin(),
                new AutoDllPlugin({
                    inject: true,
                    debug: true,
                    filename: "[name]_[hash].js",
                    path: "./dll",
                    entry: {
                        vendor: [
                            "react",
                            "react-dom",
                            "prop-types",
                            "lodash.flow",
                            "lodash.isequal",
                            "lodash.throttle",
                            "has",
                            "axios",
                            "react-dnd",
                            "react-redux",
                            "redux",
                            "redux-batched-actions",
                            "react-dnd-html5-backend",
                            "@7rulnik/react-loadable",
                            "react-paginate"
                        ]
                    }
                })
            ]
        },
        styles(),
        images()
    );
};
