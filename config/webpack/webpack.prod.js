const merge = require("webpack-merge");
const webpack = require("webpack");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const OptimizeJsPlugin = require("optimize-js-plugin");

const script = require("./parts/webpack.script");
const styles = require("./parts/webpack.style");

module.exports = () => {
    return merge(
        {
            devtool: "source-map",
            plugins: [
                new BundleAnalyzerPlugin(),
                new OptimizeJsPlugin({
                    sourceMap: process.env.NODE_ENV === "production"
                })
            ]
        },
        script({
            plugins: [require("@babel/plugin-transform-react-inline-elements")]
        })
    );
};
