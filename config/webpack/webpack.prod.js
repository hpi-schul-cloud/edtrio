const merge = require("webpack-merge");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const AutoDllPlugin = require("autodll-webpack-plugin");
const OptimizeJsPlugin = require("optimize-js-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

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
        script({
            plugins: [require("@babel/plugin-transform-react-inline-elements")]
        })
    );
};
