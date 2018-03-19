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
    loaded: []
};

//refactor
const remove_plugin = (arr, id) => {
    const { parent, child } = Plugin.get_plugin(arr, id);

    if(Number.isInteger(child)) {
        arr[parent].childs.splice(child, 1, {});
    } else {
        arr.splice(parent, 1);
    }
}

const set_content = (arr, id, content) => {
    const { parent, child } = Plugin.get_plugin(arr, id);

    if(Number.isInteger(child)) {
        arr[parent].childs[child].content = content;
    } else {
        arr[parent].content = content;
    }
}

const move_plugin = (arr, active, new_position, slot) => {
    let plugin;
    const { parent, child } = Plugin.get_plugin(arr, active);

    if(Number.isInteger(child)) {
        plugin = arr[parent].childs.splice(child, 1, {});
    } else {
        plugin = arr.splice(parent, 1);
    }

    const pos = Plugin.get_plugin(arr, new_position).parent;

    arr[pos].childs[slot] = plugin[0];
}

const plugin = (state, action) => {
    switch(action.type) {
        case SELECT_PLUGIN: 
            return {
                active: action.id,
                loaded: state.loaded,
            }
        case LOAD_PLUGIN:
            return {
                active: "",
                loaded: [...state.loaded, action.plugin],
            }
        case REMOVE_PLUGIN:
            remove_plugin(state.loaded, action.id);

            return {
                active: "",
                loaded: state.loaded,
            }
        case SET_CONTENT:
            set_content(state.loaded, action.id, action.content);

            return {
                active: state.active,
                loaded: state.loaded,
            }
        case MOVE_PLUGIN:
            move_plugin(state.loaded, state.active, action.id, action.slot);

            return {
                active: state.active,
                loaded: state.loaded,
            }
        default:
            return default_state;
    }
};

export default plugin;