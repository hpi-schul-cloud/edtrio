import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { enableBatching } from "redux-batched-actions";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import rootReducer from "./rootReducer";

import api from "edtrio/common/api";

import Editor from "./components/Editor";

import "edtrio/common/base.scss";

@DragDropContext(HTML5Backend)
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            store: null
        }
    }

    componentDidMount() {
      api.getData().then(data => {
        this.setState(state => {
          const store = createStore(
            enableBatching(rootReducer),
            data,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
          )

          store.subscribe(() => {
            api.sendData(this.state.store.getState());
          });

          return {
            store
          }
        })
      })
    }

    render() {
        const { store } = this.state;

        return (
            <React.StrictMode>
              { store
                ? (
                  <Provider store={this.state.store}>
                    <Editor />
                  </Provider>
                )
                : <p>L&auml;dt&hellip;</p>
              }
            </React.StrictMode>
        );
    }
}

export default App;
