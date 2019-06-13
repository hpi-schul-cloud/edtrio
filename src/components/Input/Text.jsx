import React from "react"
import styled from "styled-components"

import theme from "~/theme"

const StyledTextInput = styled.input`
    font-size: ${props => props.size}px;
    font-family: "PT Sans", sans-serif;
    color: ${theme.textColor};
    border: none;
    outline: none;
    width: ${props => props.full && "100%"};
    max-width: 100%;
    -webkit-appearance: none;
    border-radius: 0;

    margin-bottom: ${props => !props.noMargin && props.size / 1.6}px;

    border-bottom: 2px solid ${theme.colorGrey};
    border-bottom-color: ${props => props.readOnly && "transparent"};

    transition: 250ms border-bottom-color ease-in-out;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${theme.colorGrey};
    }
`

const TextInput = ({ value, onChange, size = 20, readOnly, ...props }) => {
    return (
        <StyledTextInput
            value={value}
            onChange={evt => onChange(evt.target.value)}
            size={size}
            readOnly={readOnly}
            {...props}
        />
    )
}

export default TextInput
