export const SELECT_PLUGIN = "SELECT_PLUGIN";
export const LOAD_PLUGIN = "LOAD_PLUGIN";
export const REMOVE_PLUGIN = "REMOVE_PLUGIN";

export const GET_CONTENT = "GET_CONTENT";
export const SET_CONTENT = "SET_CONTENT";

export const MOVE_PLUGIN = "MOVE_PLUGIN";
export const TOGGLE_VISIBLE = "TOGGLE_VISIBLE";

export const selectPlugin = (id = "") => ({
    type: SELECT_PLUGIN,
    id
});

export const addPlugin = plugin => ({
    type: LOAD_PLUGIN,
    plugin
});

export const removePlugin = id => ({
    type: REMOVE_PLUGIN,
    id
});

export const setContent = (id, content) => ({
    type: SET_CONTENT,
    id,
    content
});

export const movePlugin = (id, slot = 0, adjust_slots = false) => ({
    type: MOVE_PLUGIN,
    id,
    slot,
    adjust_slots
});

export const toggleVisible = id => ({
    type: TOGGLE_VISIBLE,
    id
});
