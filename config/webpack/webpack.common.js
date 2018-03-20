const path    = require("path");
const webpack = require("webpack");
const merge   = require("webpack-merge");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const script  = require("./parts/webpack.script");
const styles  = require("./parts/webpack.style");

const dev     = require("./webpack.dev");
const prod    = require("./webpack.prod");

module.exports = (src = {}) => {
    return merge(
            src,
            process.env.NODE_ENV === "production" ? prod() : dev(),
            {
                plugins: [
                    new CleanWebpackPlugin(path.join("./public"), { root: path.join(__dirname, "../../") }),
                    new HtmlWebpackPlugin({
                        template: "src/index.html"
                    }),
                    new ScriptExtHtmlWebpackPlugin({
                        defaultAttribute: "defer"
                    }),
                ]
            },
            script(),
            styles(),
        );
};