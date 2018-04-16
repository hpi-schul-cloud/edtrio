const AbstractStore = require("./../../models/AbstractStore");

const fs = require("fs");
const path = require("path");

class FileStore extends AbstractStore {
    saveContent(cnt) {
        fs.writeFileSync(path.join(__dirname, "content.json"), cnt);
    }
}

module.exports = FileStore;
