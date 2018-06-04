import { SET_PAGE, SET_TITLE } from "./../actions/document";

const default_document = {
    title: "",
    page: {
        count: 1,
        active: 0
    }
};

const doc = (state = default_document, action) => {
    switch (action.type) {
        case SET_PAGE: {
            const count =
                action.page === state.page.count
                    ? Math.min(state.page.count + 1, 9)
                    : state.page.count;

            return {
                title: state.title,
                page: {
                    count,
                    active: action.page
                }
            };
        }
        default: {
            return state;
        }
    }
};

module.exports = doc;
