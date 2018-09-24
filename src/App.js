import React, { Component } from 'react'
import '../node_modules/material-icons/iconfont/material-icons.css'
import './App.css'
import 'bulma/css/bulma.css'
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css'

import Editor from './Editor'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Editor />
      </div>
    )
  }
}

export default App
