import {
    SET_MODE
} from './../actions/mode';

const modes = ['easy', 'advanced'];

const mode = (state = modes[0], action) => {
    switch(action.type) {
        case SET_MODE:
            return modes.includes(action.mode) ? action.mode : modes[0];
        default:
            return state;
    }
}

export default mode;