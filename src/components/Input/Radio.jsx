import React from "react"
import styled from "styled-components"

import theme from "~/theme"

import Flex from "~/components/Flex"

const Wrapper = styled(Flex)`
    &:hover .radio-outer {
        border-color: ${theme.colors.tertiary};
    }
    cursor: pointer;
`

const Outer = styled.div`
    height: 16px;
    width: 16px;
    border-radius: 8px;
    border-width: 2px;
    border-style: solid;
    transition: 250ms all ease-in-out;
    border-color: ${props =>
        props.selected
            ? theme.colors.tertiary
            : theme.colors.disabledBackground};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`

const Inner = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${theme.colors.tertiary};
    transition: 250ms all ease-in-out;
    opacity: ${props => (props.selected ? 1 : 0)};
`

const Radio = ({ selected, onSelect, children, ...props }) => {
    return (
        <Wrapper alignCenter noWrap onClick={onSelect} {...props}>
            <Outer className="radio-outer" selected={selected}>
                <Inner selected={selected} />
            </Outer>
            {children}
        </Wrapper>
    )
}

export default Radio
