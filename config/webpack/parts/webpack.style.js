const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = ({ include, exclude = /node_modules/, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.s?css$/,
                include,
                exclude,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                            }
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ]
}); 