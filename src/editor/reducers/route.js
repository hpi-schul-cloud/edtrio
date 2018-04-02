import {
    GOTO_ROUTE,
    UPDATE_ROUTE,
} from "./../actions/route";

let route_id = 0;

const route = (state = "/", action) => {
    switch(action.type) {
        case GOTO_ROUTE: {
            route_id += 1;

            window.history.pushState({
                id: route_id,
            }, "Editor", action.path);

            return action.path;
        }
        case UPDATE_ROUTE: {
            
            return action.path;
        }
        default: {
            return state;
        }
    }
}

export default route;