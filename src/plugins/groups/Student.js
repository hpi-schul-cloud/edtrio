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

export function Student(props) {
    return (
        <StyledStudent>
            <StyledAvatarWrapper>
                <Avatar
                    style={{ width: "24px", height: "24px" }}
                    avatarStyle="Circle"
                />
            </StyledAvatarWrapper>
            <StyledStudentName>{props.name}</StyledStudentName>
        </StyledStudent>
    )
}
