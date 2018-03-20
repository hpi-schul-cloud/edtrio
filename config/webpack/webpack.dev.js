const merge  = require("webpack-merge");

const script = require("./parts/webpack.script");
const styles = require("./parts/webpack.style"); 

module.exports = () => {
    return merge(
        {
            devtool: "cheap-source-map",
        }
    )
}