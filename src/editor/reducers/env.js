import {
    SWITCH_ENV,
} from './../actions/env';

const env = (state = process.env.NODE_ENV, action) => {
    switch(action.type) {
        case SWITCH_ENV:
            return action.env;
        default:
            return state;
    }
};

export default env;