const default_document = {
    title: '',
};

const doc = (state = default_document, action) => {
    switch(action.type) {
        default: {
            return state;
        }
    }
}

module.exports = doc;