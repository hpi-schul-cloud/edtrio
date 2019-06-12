# Edtr.io [![Version](https://img.shields.io/badge/version-2.2.0-black.svg?style=flat-square)](https://github.com/schul-cloud/edtrio/releases) [![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me)

<p align="center">
  <a href="#"><img src="./public/logo.png" /></a>
</p>

<p align="center">
  A rich text editor for easily creating content in schools based on <a href="https://github.com/edtr-io/edtr-io">edtr-io</a>.
</p>
<br/>

## Getting started

```shell
npm install
```

```shell
npm run dev
```

## Dev in-depth

The project is set up with React.js (>16.8) and is mostly used without external packages or libraries.

### Structure

The `workspace` is the main entry point for the application. Everything else is abstracted logic, utilies, boilerplate, reusable components or state handling. In theory, the `workspace` should reproduce the route handling of the application.

Currently, the route handling is done with `react-router`, but it is not clear how or if route handling is necessary in the future. Having the lesson as entry point might not require advanced route handling.

#### imports

`import`s should always begin with `~`. This will give you `src/` as an entry point. There is two exceptions for this rule:

1. 3rd party packages
2. `import`-ing modules that are in the same folder or in the "vicinity" of the importing module.

Example:

```
import React from 'react'

import { Text } from '~/components/Text'

import LocalModule from './local-module.js'
```

#### import order

`import`s should be done in a specific order:

1. 3rd party packages
2. Global state & util functions
3. Reusable components
4. Local modules

Example:

```
import React from 'react'
import styled-components from 'styled-components'

import { LessonContext } from '~/contexts/Lesson'
import { useInterval } from '~/utils/hooks'

import Text from '~/components/Text'
import Container from '~/components/Container'

import LocalModule from './local-module.js'
```

### components

You can find a live storybook at [https://schul-cloud-edtr-storybook.web.app](https://schul-cloud-edtr-storybook.web.app)

Reusable components are built with `styled-components` and can be viewed in the storybook (`npm run storybook`). All props can be viewed either in the component file itself (destructuring) or under the "Knobs" tab in storybook. Often times, props can be bassed as booleans and are structured in a way that the default value is false, for example:

```
import Text from '~/components/Text'

<Text inline>My Text</Text>

---
import Button from '~/components/Button'

<Button secondary full>My Button</Button>
```

### state management

State management can be done either locally through `React.useState()` or globabally with through React's Context API. Currently, there is one main state provider, the LessonContext (`src/contexts/Lesson`). In this store, you will find all the state for editing, saving, the section content etc.

If you want to implement another global store, simply copy & paste this file and remove all the explicit logic.

To access and change the state (dispatch actions), you have to use the `LessonContext`. You can then access it through `React.useContext()`

```
import React, { useContext } from 'react'

import { LessonContext } from '~/contexts/Lesson'

const MyComponent = () => {
    const {store, dispatch} = useContext(LessonContext)

	return (
		<button onClick={() => dispatch({type: 'MY_ACTION', payload: ...})}>
			{store...}
		</button>
	)
}
```

### API

The api connection is done through REST with a feathers backend. The backend endpoint is the schul-cloud server. Making an API call has to be done in a react component, since async operations inside a reducer are not permitted (in case you wanted to do that in a global context). The API util can be found in 'src/utils/api'. Here are a couple example use cases:

```
// 1. normal get request
api.get('/editor/lessons/123').then(data => {
    console.log(data)
})

// 2. post request with body
api.post('/editor/lessons/123', { name: 'Augustiner' }).then(data => {
    console.log(data)
})

// 3. post request with body with an error
api.post('/editor/sections/456', { name: 'Augustiner' })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.error(err)
    })

// 4. post request with files
api.post('/editor/sections/456', { name: 'Whatever' }, { picture: store.picture })
    .then(data => {
    // picture will be sent as FormData
        console.log(data)
    }
)
```

Authentication etc will be handled automatically.

### Error handling

Specific error handling has to be done inside of components. Generic error handling can be done through setting the `error` field in the LessonContext. A global Error message will then be shown. For example:

```
dispatch({type: 'ERROR', payload: 'Fehler beim sichern der Daten...'})
```

### Caching

Whenever there is an error saving to the backend, the current lesson data will be cached. That way, the teacher can keep working on the lesson, even when online. When the page (re-)loads, it is checked if the last version of the lesson was pushed to the backend or not. If not, the cached state will be used. When the teacher gains access to the internet again (or when there is no error with saving any more), the saving behavior will be as usual.

### Editor

The editor used is [edtr-io](https://github.com/edtr-io/edtr-io). The API for the editor can be found on their github page.

#### Plugins

Internal plugins will lie in `src/plugins` and should be completely isolated.

#### Build

To build the editor, simply run `npm run build`.

#### Integration in schulcloud-client

Once built, push your build to github. Then, copy the commit hash and use jsdelivr to generate a static link to the script, for example: `https://cdn.jsdelivr.net/gh/schul-cloud/edtrio@COMMIT_HASH/dist/index.js`. You can then pass this url to the schulcloud-editor as `process.env.EDTR_SOURCE`. When you go to the current topic editor, you can now add the query `?edtr=true` to load the new editor.

If you want to debug the editor integration locally, you can run the editor with `npm run dev:editor` and start the schulcloud-client with `EDTR_SOURCE="http://localhost:1234/index.js" npm run watch`. You can then go to the topic editor locally and open this editor when appending the query `?edtr=true`.

## License

The project is licensed under the [MIT License](LICENSE).
