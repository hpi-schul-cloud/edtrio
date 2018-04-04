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
} from './../actions/plugin';

import Plugin from 'x-editor/models/Plugin';

import { deepclone } from "x-editor/utils";

const default_state = {
    active: '',
    lookup: {},
};

//delete all plugin references and children
const deletePlugin = (lookup, key) => {
    let start  = lookup[key];
    const parent = [start];

    //delete parent if exists
    if(start.parent)
        lookup[start.parent].childs.filter(childs => childs !== start.id);

    while(parent.length > 0) {
        start = parent.shift();

        //push all children and filter array filled with undefined
        parent.push(...(start.childs.filter(i => i)));

        delete lookup[start.id];
    }
}

const plugin = (state = default_state, action) => {
    switch(action.type) {
        case SELECT_PLUGIN: 
            return {
                active: action.id,
                lookup: state.lookup,
            }
        case LOAD_PLUGIN:
            return {
                active: '',
                lookup: {
                    ...state.lookup,
                    [action.plugin.id]: action.plugin,
                }
            }
        case REMOVE_PLUGIN:
            deletePlugin(state.lookup, action.id);

            return {
                active: '',
                lookup: state.lookup,
            }
        case SET_CONTENT:
            state.lookup[action.id].content = action.content;

            return {
                ...state
            }
        case MOVE_PLUGIN: {
            const next = deepclone(state);

            const dest = next.lookup[action.id];
            const src  = next.lookup[state.active];
            const { parent } = src;

            //delete from old slot
            if(Number.isInteger(parent))
                next.lookup[parent].childs[src.slot] = null;

            src.slot = action.slot;
            dest.childs[action.slot] = src.id;
            src.parent = dest.id;

            return next;
        }
        default:
            return state;
    }
};

export default plugin;