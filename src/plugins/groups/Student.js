import React from "react"
import styled from "styled-components"
import Avatar from "avataaars"

const StyledStudent = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
    padding: 3px;
    max-width: 120px;
    background: LavenderBlush;
    border-radius: 15px;
    flex: 1;
    box-shadow: 5px 5px 9px -3px Grey;
`

const StyledAvatarWrapper = styled.div`
    padding-right: 4px;
    display: flex;
    align-items: center;
    min-height: 24px;
`

const StyledStudentName = styled.div`
    padding-top: 2px;
    padding-right: 4px;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    font-size: 12px;
`

const StyledAvatar = styled.span`
     {
        background: black;
        width: 24px;
        height: 24px;
        text-align: center;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        font-size: 14px;
        line-height: 14px;
        color: #fff;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        }
    }
`

export function Student(props) {
    let initials = props.name.match(/\b\w/g) || []
    initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase()
    return (
        <StyledStudent>
            <StyledAvatarWrapper>
                <StyledAvatar>{initials}</StyledAvatar>
            </StyledAvatarWrapper>
            <StyledStudentName>{props.name}</StyledStudentName>
        </StyledStudent>
    )
}
