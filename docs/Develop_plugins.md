---
description: How to build a plugin for Edtr.io
---

`//TODO` Distinguish between CONTENT and LAYOUT plugins

# Getting Started
Edtr.io plugins are just simple [React Components](https://reactjs.org/docs/components-and-props.html) which are automatically wrapped by the build tools.

The create a plugin you need to follow these 3 steps:

1. Go to the plugins folder located at `src/plugins` and create a folder for your Plugin

2. Create a `package.json` using `npm init` or `yarn init` and add the below keys to it:

    ```javascript
    //generated parts of package.json...
    //append:
    "x": {
        "displayName": "<your_plugin_name>", 
        "type": "CONTENT" or "GRID"
    }
    ```

3. Create your `plugin.jsx` file and export a React Component

# Simple Content Plugin
To give you a better understanding we will show you how to build some plugins. A simple and an advanced one.

We will start with a simple image Plugin. It will display an image from an URL.

We start by executing the 3 steps on the top. Now our file structure should look like this:

```text
plugins/
└── ImagePlugin/
    ├── package.json
    └── Image.jsx
```

Then we create a React skeleton as such:

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Image extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.content,
        })
    }

    render() {
        return (
            <div>
                <img src={this.state.src} ref={image => this.image = image}/>
            </div>
        )
    }

    static propTypes = {
        isEditable : PropTypes.bool.isRequired,
        content    : PropTypes.object,
        saveContent: PropTypes.func.isRequired,
    }
}

export default Image;
```

# Advanced Configuration
`//TODO` interactive, viewer, print

# Existing Plugins Overview
| Name   | Description                       |
|--------|-----------------------------------|
| [Dummy](https://github.com/schul-cloud/edtrio/tree/master/src/plugins/DummyPlugin)  | Empty Plugin for testing purposes |
| [Layout](https://github.com/schul-cloud/edtrio/tree/master/src/plugins/LayoutPlugin) | Two column layout                 |
| [Line](https://github.com/schul-cloud/edtrio/tree/master/src/plugins/LinePlugin)   | Thematic brake                    |