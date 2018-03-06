import React, { Component } from 'react'
import makePlugin from './utils'


/**
 * MissingPlugin to be displayed when no plugin could be
 * resolved by Editor:_resolvePlugin
 * Is not intended to appear in production and likely
 * hints that an error has been made.
 */
class MissingPlugin extends Component {
    render() {
        const { type } = this.props

        return (
            <div style={{ backgroundColor: '#ff8a80', padding: 10}}>
                <h1>The plugin <code style={{backgroundColor: 'transparent'}}>{type}</code> is missing!</h1>
                <p>This is likely caused by an incorrect import in Editor.js</p>
            </div>
        )
    }
}

export default makePlugin(MissingPlugin)
