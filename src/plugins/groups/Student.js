import React from "react"
import styled from "styled-components"
import Text from "../../components/Text"

const StyledStudent = styled.div`
    display: flex;
    align-items: center;
    padding: 3px 6px;
    width: 120px;
    border: 1px solid #333333;
    background: #333333;
    border-radius: 15px;
    flex: 1;
    flex-grow: 0;
    box-shadow: 5px 5px 9px -3px Grey;
    max-height: 20px;
`

const StyledFullStudent = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #333333;
    background: #333333;
    border-radius: 15px;
    padding: 3px 6px;
    flex-grow: 0;
    max-height: 20px;
`

const StyledStudentName = styled(Text)`
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    font-size: 12px;
    color: White;
`

const StyledFullStudentName = styled.div`
    padding-top: 2px;
    padding-right: 4px;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    font-size: 12px;
    color: White;
`

export function Student(props) {
    let initials = props.name.match(/\b\w/g) || []
    initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase()
    return (
        <StyledStudent className={props.className}>
            <StyledStudentName center noMargin inline>
                {props.name}
            </StyledStudentName>
        </StyledStudent>
    )
}

export function FullStudent(props) {
    return (
        <StyledFullStudent className={props.className}>
            <StyledFullStudentName center noMargin inline>
                {props.name}
            </StyledFullStudentName>
        </StyledFullStudent>
    )
}
