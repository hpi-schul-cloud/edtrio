const fse = require("fs-extra")
const path = require("path")

const distPath = path.join(__dirname, "../dist")

fse.removeSync(distPath)
