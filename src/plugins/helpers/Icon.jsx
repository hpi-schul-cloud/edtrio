import React from 'react'


const Icon = ({ className, children, ...rest }) => (
    <span className={`material-icons ${className}`} {...rest}>
        { children }
    </span>
)

export default Icon
