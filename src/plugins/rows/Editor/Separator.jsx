import React from "react"
import styled, { css } from "styled-components"

const StyledSeparator = styled.div`
    position: absolute;
    height: auto;
    width: calc(100% - 60px);

    ${props =>
        props.isFirst
            ? css`
                  top: 0;
                  transform: translateY(-100%);
              `
            : css`
                  bottom: 0;
                  transform: translateY(100%);
              `}
`

const TriggerArea = styled.div`
    width: 100%;
    padding: 2px 0 4px;
    display: flex;
    justify-content: center;

    &:hover .add-trigger {
        /* transition: 250ms all ease-in-out 250ms; */
        opacity: 0.6;
    }
`

const AddTrigger = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 250ms all ease-in-out 250ms;
    position: relative;
    z-index: 999;

    &:hover {
        opacity: 1 !important;
        cursor: pointer;
    }

    ${props =>
        props.inline &&
        css`
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0.6;
        `}
`

const Icon = styled.img`
    width: 26px;
`

export const Add = ({ onClick, inline, ...props }) => {
    return (
        <AddTrigger
            inline={inline}
            className="add-trigger"
            onClick={onClick}
            {...props}>
            <Icon src={require("../assets/plus.svg")} />
        </AddTrigger>
    )
}

const Separator = ({ isFirst, onClick }) => {
    return (
        <StyledSeparator isFirst={isFirst}>
            <TriggerArea>
                <Add onClick={onClick} />
            </TriggerArea>
        </StyledSeparator>
    )
}

export default Separator
