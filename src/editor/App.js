import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { enableBatching } from "redux-batched-actions";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import Router from "./components/Router";

import rootReducer from "./rootReducer";

import api from "./api";
import routes from "./routes";

import "./App.scss";

@DragDropContext(HTML5Backend)
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            store: createStore(
                enableBatching(rootReducer),
                {
                    ...api.getData(),
                    route: window.location.pathname,
                },
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            ),
        };

        this.state.store.subscribe(() => {
            api.sendData(this.state.store.getState());
        });
    }

    render() {
        return (
            <React.StrictMode>
                <Provider store={this.state.store}>
                    <>
                        <Router config={routes}/>
                    </>
                </Provider>
            </React.StrictMode>
        );
    }
}

export default App;
