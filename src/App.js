import React, { Component } from 'react'
import './App.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { grey700 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { AppBar } from 'material-ui'

import Editor from './components/Editor'


class App extends Component {
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: grey700,
      },
    })

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppBar
            title="Project X"
            showMenuIconButton={false} />
          <Editor />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
