class AbstractStore {
    saveContent() {
        throw new Error("saveContent must be implemented");
    }
}

module.exports = AbstractStore;
