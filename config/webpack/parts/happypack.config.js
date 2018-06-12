const HappyPack = require("happypack");
const os = require("os");

const thread_pool = HappyPack.ThreadPool({
    size: os.cpus().length - 1
});

module.exports = thread_pool;
