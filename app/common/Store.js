const FileStore = require("./imp/FileStore");

const createStore = options => {
    class Store extends FileStore {
        saveContent(cnt) {
            super.saveContent(cnt);
        }
    }

    return new Store();
};

module.exports = createStore;
