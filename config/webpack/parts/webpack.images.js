module.exports = ({ include, exclude = /node_modules/, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: "[hash].[ext]",
                        fallback: "file-loader"
                    }
                }
            }
        ]
    }
});