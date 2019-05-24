import React, { useEffect } from "react"
import Button from "../../components/Button"
import styled from "styled-components"
import uuid from "uuid/v4"

const StyledAssignmentSpace = styled.div`
    width: 100%;
    height: 100px;
    border: 1px dashed #333333;
    display: flex;
    align-items: center;
    justify-content: center;
`

export function Jigsaw(props) {
    const { editable, state } = props
    useEffect(() => {
        if (state.children.items.length === 0) {
            const setId = uuid()
            state.children.insert(state.children.items.length, {
                plugin: "quickGroup",
                state: {
                    workingPackages: [],
                    startValues: null,
                    setId,
                    StudentsChooseGroup: false,
                    coupledToId: null,
                    isPartOfJigsaw: true,
                },
            })
            state.children.insert(state.children.items.length + 1, {
                plugin: "rows",
            })
            state.children.insert(state.children.items.length + 2, {
                plugin: "group",
                state: {
                    workingPackages: [],
                    startValues: null,
                    setId: uuid(),
                    StudentsChooseGroup: false,
                    coupledToId: setId,
                    isPartOfJigsaw: true,
                },
            })
            state.children.insert(state.children.items.length + 3, {
                plugin: "rows",
            })
            state.children.insert(state.children.items.length + 4, {
                plugin: "quickGroup",
                state: {
                    workingPackages: [],
                    startValues: null,
                    setId,
                    StudentsChooseGroup: false,
                    coupledToId: setId,
                    isPartOfJigsaw: true,
                },
            })
        }
    }, [])
    return <div>{state.children.items.map(child => child.render())}</div>
}
