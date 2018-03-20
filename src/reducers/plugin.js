/* Schema
 * {
 *      active: ${plugin_id},
 *      loaded: [${class Plugin(id, name, content)}]
 * }
 */

import {
    SELECT_PLUGIN,
    LOAD_PLUGIN,
    REMOVE_PLUGIN,
    SET_CONTENT,
    MOVE_PLUGIN,
} from "./../actions/plugin";

import Plugin from "./../models/Plugin";

const default_state = {
    active: "",
    lookup: {},
};

const deletePlugin = (lookup, key) => {
    let start  = lookup[key];
    let parent = [start];

    //delete parent if exists
    if(start.parent)
        lookup[start.parent].childs.filter(childs => childs !== start.id);

    while(parent.length > 0) {
        start = parent.shift();

        parent.push(...start.childs);

        delete lookup[start.id];
    }
}

const plugin = (state, action) => {
    switch(action.type) {
        case SELECT_PLUGIN: 
            return {
                active: action.id,
                lookup: state.lookup,
            }
        case LOAD_PLUGIN:
            return {
                active: "",
                lookup: {
                    ...state.lookup,
                    [action.plugin.id]: action.plugin,
                }
            }
        case REMOVE_PLUGIN:
            deletePlugin(state.lookup, action.id);

            return {
                active: "",
                lookup: state.lookup,
            }
        case SET_CONTENT:
            state.lookup[action.id].content = action.content;

            return {
                active: state.active,
                lookup: state.lookup,
            }
        case MOVE_PLUGIN:
            const dest = state.lookup[action.id];
            const src  = state.lookup[state.active];
            const parent = src.parent;

            //delete from old slot
            if(Number.isInteger(parent))
                state.lookup[parent].childs[src.slot] = null;

            src.slot = action.slot;
            dest.childs[action.slot] = src.id;
            src.parent = dest.id;

            return {
                active: state.active,
                lookup: state.lookup,
            }
        default:
            return default_state;
    }
};

export default plugin;