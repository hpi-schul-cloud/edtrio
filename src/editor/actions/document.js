export const SET_PAGE = "SET_PAGE";

export const SET_TITLE = "SET_TITLE";

export const set_page = page => ({
    type: SET_PAGE,
    page: Math.max(page, 0)
});

export const set_title = title => ({
    type: SET_TITLE,
    title
});
