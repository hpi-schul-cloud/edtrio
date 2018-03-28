const path = require("path");

const common = require("./config/webpack/webpack.common");

const src = {
    entry: "./src/editor/index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "public")
    },
    mode: process.env.NODE_ENV,
    resolve: {
        extensions: [".js", ".json", ".jsx"],
    }
};

module.exports = () => common(src);