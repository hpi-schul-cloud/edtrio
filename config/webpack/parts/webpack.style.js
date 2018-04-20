const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ include, exclude = /node_modules/, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.s?css$/,
                include,
                exclude,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
            ]
        },
    ]},
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ]
}); 