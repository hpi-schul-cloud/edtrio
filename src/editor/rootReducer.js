import { combineReducers } from 'redux';

import plugin  from './reducers/plugin';
import mode    from './reducers/mode';
import doc     from './reducers/document';
import env     from './reducers/env';

const rootReducer = combineReducers({
    plugin,
    mode,
    env,
    doc,
});

export default rootReducer;