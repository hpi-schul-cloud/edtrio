import {
    SET_MODE
} from "./../actions/mode";

const modes = ["easy", "advanced"];

const mode = (state, action) => {
    switch(action.type) {
        case SET_MODE:
            return modes.includes(action.mode) ? action.mode : modes[0];
        default:
            return modes[0];
    }
}

export default mode;