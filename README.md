# Project X

## Understanding the document structure
Each document consists of multiple plugins. The content of the plugins gets stored in one global state which is managed by the `Editor` component.\
Having one global state enables consistent data across all plugins and simplifies importing and exporting of documents on a global level.\
This does in no way restrict a component from having its own local state. Permanent changes to the content [have to follow a specific schema](#dealing-with-the-plugins-content) though.

## Create a plugin
Simple! Just create a regular React Component and apply the `makePlugin()` [HOC](https://reactjs.org/docs/higher-order-components.html) at the very end.\
More information may be found in `/src/components/plugins/DummyPlugin.jsx`.

### Example
```javascript
import React, { Component } from 'react'
import makePlugin from './utils'


class ExamplePlugin extends Component {
  render() {
    return (
      <p>Hello from ExamplePlugin!</p>
    )
  }
}

export default makePlugin(ExamplePlugin)
```

## Checking whether the plugin is editable
After applying the `makePlugin` HOC, each plugin gets supplied an `this.props.editable`. Simply listen to that and you'll be able to detect whether the plugin is currently editable.

### Example
```javascript
if(this.props.editable) {
  return <p>I am editable!</p>
} else {
  return <p>I am <strong>not</strong> editable.</p>
}
```

## Dealing with the plugins content
As mentioned previously, all content of the document, therefore including all plugins, gets stored in one global state in the `Editor` component.\
This calls for a very strict way of reading and writing content.\
It's basically just using `this.props.content` and `this.props.setContent(newContent)` inside of your plugin.

### Schema
A plugins' content is stored as a JSON object.

### Read
There might be content existing when the plugin gets loaded. Consider for example having an existing document that shall be manipulated.\
That existing content gets managed and injected as a `prop` via the editor. Reading if can thus be achieved by simply calling `this.props.content`.

#### Example
```javascript
/*
 * Imagine content to be the following:
 *     this.props.content = {
 *         "name": "User",
 *         // ...
 *     }
 */

render() {
  // ...
  const { name } = this.props.content

  return (
    <p>Hello {name}!</p>
  )
}
```

### Write
`TODO`
```javascript
    this.props.setContent(newContent) // probably
```

---
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find the most recent version of the original guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).