import React, { Component } from 'react';
import '../node_modules/material-icons/iconfont/material-icons.css'
import './App.css';

import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Editor />
      </div>
    );
  }
}

export default App;
