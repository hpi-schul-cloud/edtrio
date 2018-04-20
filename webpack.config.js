const path = require("path");

const common = require("./config/webpack/webpack.common");

const src = {
    entry: {
        edtrio: "./src/editor/index.js",
        viewer: "./src/viewer/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "public")
    },
    mode: process.env.NODE_ENV,
    resolve: {
        extensions: [".js", ".json", ".jsx"]
    }
};

module.exports = () => common(src);
