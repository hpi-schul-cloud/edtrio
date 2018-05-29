const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");

const script = require("./parts/webpack.script");
const styles = require("./parts/webpack.style");

module.exports = () => {
    return merge(
        {
            devtool: "cheap-source-map",
            devServer: {
                historyApiFallback: {
                    rewrites: [
                        {
                            from: /^\/$/,
                            to: "./public/edtrio.html"
                        },
                        {
                            from: /^\/viewer/,
                            to: "./public/viewer.html"
                        }
                    ]
                }
            },
            plugins: [new WriteFilePlugin()]
        },
        script()
    );
};
