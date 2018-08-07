import './style.css'

import React, { Component } from 'react'
import Value from 'slate'


export default function TextMenu(options) {
    return {
        changes: {},
        helpers: {},
        components: {},
        plugins: [],
    }
}

// ================================================

class HoveringMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: Value.fromJSON(initialValue)
        }
    }
}