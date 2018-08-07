import React from 'react'

import './button.css'

const Button = (props) => (
    <span
        className={`button ${props.active ? 'active' : ''} ${props.reversed ? 'reversed' : ''}`}
        onMouseDown={props.onMouseDown}
    >
        { props.children }
    </span>
)

export default Button