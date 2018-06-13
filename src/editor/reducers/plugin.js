import {
    SELECT_PLUGIN,
    LOAD_PLUGIN,
    REMOVE_PLUGIN,
    SET_CONTENT,
    MOVE_PLUGIN,
    TOGGLE_VISIBLE
} from "./../actions/plugin";

import Plugin from "edtrio/models/Plugin";

import { deepclone, arrayMove } from "edtrio/utils";

const default_state = {
    active: "",
    lookup: {}
};

//slot = 0 Position top, 1 Position bottom
const movePlugin = (plugin, dest, slot) => {
    //get parent from the drop target el and put above or below
    const { parent } = plugin.lookup[dest];

    //sorted list of plugins above current
    const sorted = Object.values(plugin.lookup)
        .filter(pl => pl.parent === parent)
        .sort((a, b) => a.slot - b.slot);

    const dest_index = sorted.findIndex(p => p.id === dest);

    //remove from childs
    const drag_parent = plugin.lookup[plugin.active].parent;
    if (drag_parent) {
        plugin.lookup[drag_parent].childs = plugin.lookup[
            drag_parent
        ].childs.map(childs => {
            return childs === plugin.active ? null : childs;
        });
    }

    if (parent !== drag_parent) {
        sorted.forEach((item, i) => {
            if (i < dest_index) item.slot -= 1;
        });

        //set new values
        plugin.lookup[plugin.active].parent = plugin.lookup[dest].parent;
        plugin.lookup[plugin.active].slot = plugin.lookup[dest].slot + slot;

        sorted.splice(dest_index + slot, 0, plugin.lookup[plugin.active]);
    } else {
        const src_index = sorted.findIndex(
            p => p.id === plugin.lookup[plugin.active].id
        );

        [sorted[src_index].slot, sorted[dest_index].slot] = [
            sorted[dest_index].slot,
            sorted[src_index].slot
        ];
    }

    sorted.sort((a, b) => a.slot - b.slot).forEach((item, i) => {
        item.slot = i;
    });
};

const nestPlugin = ({ active, lookup }, id, slot) => {
    //fix slot removal
    const dest = lookup[id];
    const src = lookup[active];
    const { parent } = src;

    //delete from old slot
    if (Number.isInteger(parent)) lookup[parent].childs[src.slot] = null;

    src.slot = slot;
    src.parent = dest.id;

    dest.childs[slot] = src.id;
};

//delete all plugin references and children
const deletePlugin = (lookup, key) => {
    let start = lookup[key];
    const parent = [start];

    //delete from parent if exists
    if (start.parent) {
        lookup[start.parent].childs = lookup[start.parent].childs.map(
            childs => {
                return childs === key ? null : childs;
            }
        );
    }

    while (parent.length > 0) {
        start = parent.shift();

        //push all children and filter array filled with undefined
        parent.push(...start.childs.filter(i => i).map(i => lookup[i]));

        delete lookup[start.id];
    }

    return {
        lookup
    };
};

const plugin = (state = default_state, action) => {
    switch (action.type) {
        case SELECT_PLUGIN:
            return {
                active: action.id,
                lookup: state.lookup
            };
        case LOAD_PLUGIN:
            return {
                active: "",
                lookup: {
                    ...state.lookup,
                    [action.plugin.id]: action.plugin
                }
            };
        case REMOVE_PLUGIN: {
            return {
                active: "",
                ...deletePlugin(state.lookup, action.id)
            };
        }
        case SET_CONTENT: {
            state.lookup[action.id].content = action.content;

            return {
                ...state
            };
        }
        case MOVE_PLUGIN: {
            const next = deepclone(state);

            action.adjust_slots
                ? movePlugin(next, action.id, action.slot)
                : nestPlugin(next, action.id, action.slot);

            return next;
        }
        case TOGGLE_VISIBLE: {
            state.lookup[action.id] = {
                ...state.lookup[action.id],
                visible: !state.lookup[action.id].visible
            };

            return {
                ...state
            };
        }
        default:
            return state;
    }
};

export default plugin;
