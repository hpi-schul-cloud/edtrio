const HappyPack = require("happypack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const thread_pool = require("./happypack.config");

module.exports = ({ include, exclude = /node_modules/, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.s?css$/,
                include,
                exclude,
                use: [MiniCssExtractPlugin.loader, "happypack/loader?id=style"]
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: "style",
            threadPool: thread_pool,
            loaders: [
                {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                },
                {
                    loader: "postcss-loader"
                },
                {
                    loader: "sass-loader"
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
});
