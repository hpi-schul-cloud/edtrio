import React, { Component } from 'react'

import makePlugin from './utils'


/**
 * Dummy Plugin for testing
 * Does not have any functionality apart from displaying whether it is in edit
 * mode or not.
 * **DEVELOPMENT ONLY**
 */
class DummyPlugin extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            lx: 'lx',
            ly: 'ly'
        }
    }

    handleChange(e) {
        this.props.setContent({
            ...this.props.xIn,
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        const { val, editable } = this.props
        const pxIn = this.props.content || {
            lx: 'XXX',
            ly: 'YYY'
        }
        
        return (
            <React.Fragment>
                <div>unstyled</div>
                <h2>{val || 'Static dummy text plugin'}</h2>
                <div>{`Editable: ${editable}`}</div>
                <input
                    type="text"
                    name="lx"
                    value={pxIn.lx}
                    onChange={this.handleChange} />
                <input
                    type="text"
                    name="ly"
                    value={pxIn.ly}
                    onChange={this.handleChange} />
            </React.Fragment>
        )
    }
}

export default makePlugin(DummyPlugin)
