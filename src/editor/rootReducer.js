import { combineReducers } from "redux";

import plugin  from "./reducers/plugin";
import mode    from "./reducers/mode";
import doc     from "./reducers/document";
import env     from "./reducers/env";
import route   from "./reducers/route";

const rootReducer = combineReducers({
    plugin,
    mode,
    env,
    doc,
    route,
});

export default rootReducer;