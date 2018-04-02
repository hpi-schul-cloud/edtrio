export const GOTO_ROUTE = "GOTO_ROUTE";
export const UPDATE_ROUTE = "UPDATE_ROUTE";

export const gotoRoute = path => ({
    type: GOTO_ROUTE,
    path,
});

export const updateRoute = path => ({
    type: UPDATE_ROUTE,
    path,
});