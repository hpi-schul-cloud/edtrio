module.exports = ({ include, exclude = /node_modules/, options } = {}) => ({
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude,
                loader: "eslint-loader",
            },
            {
                test: /\.jsx?$/,
                include,
                exclude,
                use: {
                    loader: "babel-loader",
                    options,
                }
            }
        ]
    }
});