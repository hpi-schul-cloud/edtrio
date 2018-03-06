import React, { Component } from 'react'

import makePlugin from './utils'


/**
 * Dummy Plugin for testing
 * Does not have any functionality apart from displaying whether it is in edit
 * mode or not.
 * **DEVELOPMENT ONLY**
 */
class TextPlugin extends Component {
    render() {
        const { val, editable } = this.props
        
        return (
            <div>
                <div>unstyled</div>
                <h2>{val || 'Static dummy text plugin'}</h2>
                <div>{`Editable: ${editable}`}</div>
            </div>
        )
    }
}

export default makePlugin(TextPlugin)
