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

    const sorted = Object.values(plugin.lookup)
        .filter(pl => pl.parent === parent)
        .sort((a, b) => a.slot - b.slot);

    let dest_index = sorted.findIndex(p => p.id === dest);
    const src_index = sorted.findIndex(
        p => p.id === plugin.lookup[plugin.active].id
    );

    //top
    if (!slot) {
        //console.log("top");
        //unten nach oben
        if (src_index > dest_index) {
            //ok
            //console.log("unten nach oben")
        } else {
            //ok
            dest_index -= 1;
            //console.log("oben nach unten")
        }
    } else {
        //bottom
        //unten nach oben
        //console.log("bottom");
        if (src_index > dest_index) {
            //console.log("unten nach oben")
            dest_index += 1;
        } else {
            //ok
            //console.log("oben nach unten")
        }
    }

    arrayMove(sorted, src_index, dest_index);

    if (src_index > dest_index) {
        for (let i = dest_index; i <= src_index - 1; i += 1) {
            //swap slots
            [sorted[i].slot, sorted[i + 1].slot] = [
                sorted[i + 1].slot,
                sorted[i].slot
            ];
        }
    } else {
        //TODO
        for (let i = dest_index; i >= src_index + 1; i -= 1) {
            //swap slots
            [sorted[i].slot, sorted[i - 1].slot] = [
                sorted[i - 1].slot,
                sorted[i].slot
            ];
        }
    }
};

const nestPlugin = (plugin, id, slot) => {
    //fix slot removal
    const dest = plugin.lookup[id];
    const src = plugin.lookup[plugin.active];
    const { parent } = src;

    //delete from old slot
    if (Number.isInteger(parent)) plugin.lookup[parent].childs[src.slot] = null;

    src.slot = slot;
    dest.childs[slot] = src.id;
    src.parent = dest.id;
};

//delete all plugin references and children
const deletePlugin = (lookup, key) => {
    let start = lookup[key];
    const parent = [start];

    //delete from parent if exists
    if (start.parent) {
        lookup[start.parent].childs = lookup[start.parent].childs.map(
            childs => childs
        );
    }

    while (parent.length > 0) {
        start = parent.shift();

        //push all children and filter array filled with undefined
        parent.push(...start.childs.filter(i => i).map(i => lookup[i]));

        delete lookup[start.id];
    }
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
            const next = deepclone(state);

            deletePlugin(next.lookup, action.id);

            return {
                active: "",
                lookup: next.lookup
            };
        }
        case SET_CONTENT: {
            const next = deepclone(state);

            next.lookup[action.id].content = action.content;

            return next;
        }
        case MOVE_PLUGIN: {
            const next = deepclone(state);

            action.adjust_slots
                ? movePlugin(next, action.id, action.slot)
                : nestPlugin(next, action.id, action.slot);

            return next;
        }
        case TOGGLE_VISIBLE: {
            const next = deepclone(state);

            next.lookup[action.id].visible = !next.lookup[action.id].visible;

            return next;
        }
        default:
            return state;
    }
};

export default plugin;
