import React, { Component } from 'react';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { enableBatching } from 'redux-batched-actions';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import {
  AppBar,
} from "x-editor/UI";

import Editor from './components/Editor';
import rootReducer from "./rootReducer";

import { selectPlugin } from "./actions/plugin";

import './App.scss';

const store = createStore(
  enableBatching(rootReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

@DragDropContext(HTML5Backend)
class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <>
            <AppBar title="X"/>

            <Editor />
          </>
        </Provider>
      </>
    )
  }
}

export default App;
