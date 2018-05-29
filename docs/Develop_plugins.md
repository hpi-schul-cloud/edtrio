---
description: How to build a plugin for Edtr.io
---

# Getting Started
Edtr.io plugins are just simple [React Components](https://reactjs.org/docs/components-and-props.html) which are automatically wrapped by the build tools.

The create a plugin you need to follow these 3 steps:

1. Go to the plugins folder located at `src/plugins` and create a folder for your Plugin

2. Create a `package.json` using `npm init` or `yarn init` and add the below keys to it:

    ```javascript
    //generated parts of package.json...
    //append:
    "edtrio": {
        "displayName": "<your_plugin_name>", 
        "type": "CONTENT"
    }
    ```

3. Create your `plugin.jsx` file and export a React Component

> Note: Don't want to do that manually? Use our super simple [Yeoman generator](https://www.npmjs.com/package/generator-edtriopg)!

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
`//TODO` interactive, viewer

# Further information
## Validation and forms (Dynamic plugins)
`UI/ValidatorButton` with a `valid:boolean` and `validate:func` that can be reused
`plugin/MultipleChoice` that demonstrates how to create dynamic plugins

## Plugin Types
Used in `package.json` of each plugin.

| Type    | Description                                                                        |
|---------|------------------------------------------------------------------------------------|
| `CONTENT` | Simple content that is being displayed.<br /> (`default`) Suitable for most plugins|
| `INPUT`   | More complex content that requires user input and optionally verifies it.          |
| `LAYOUT`  | Meta category for plugins that visually transform other plugins, e.g. `TwoColLayout` |

## Print Mode
If you want to use custom styles for your plugin if it gets printed, simply place a `print.scss` in the plugin root folder.
