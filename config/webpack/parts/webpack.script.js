const HappyPack = require("happypack");
const thread_pool = require("./happypack.config");

module.exports = ({ include, exclude = /node_modules/, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include,
                exclude,
                use: "happypack/loader?id=script"
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: "script",
            threadPool: thread_pool,
            loaders: [
                {
                    loader: "babel-loader",
                    options
                },
                "eslint-loader"
            ]
        })
    ]
});
