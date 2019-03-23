import React from "react"
import Button from "../../components/Button"
import styled from "styled-components"

const StyledAssignmentSpace = styled.div`
    width: 100%;
    height: 100px;
    border: 1px dashed #333333;
    display: flex;
    align-items: center;
    justify-content: center;
`

export function Assignment(props) {
    const editable = { props }
    if (editable) {
        return (
            <StyledAssignmentSpace>
                Abgabebereich für Schüler
            </StyledAssignmentSpace>
        )
    } else {
        return (
            <StyledAssignmentSpace>
                Abgaben hier hochladen
            </StyledAssignmentSpace>
        )
    }
}
