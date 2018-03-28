import {
    SWITCH_ENV,
} from "./../actions/env";

const env = (state, action) => {
    switch(action.type) {
        case SWITCH_ENV:
            return action.env;
        default:
            return process.env.NODE_ENV;
    }
};

export default env;