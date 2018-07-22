const HappyPack = require("happypack");
const thread_pool = require("./happypack.config");

module.exports = ({ include, exclude = /node_modules/, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                include,
                exclude,
                use: "happypack/loader?id=image"
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: "image",
            threadPool: thread_pool,
            loaders: [
                {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: "[hash].[ext]",
                        fallback: "file-loader"
                    }
                }
            ]
        })
    ]
});
