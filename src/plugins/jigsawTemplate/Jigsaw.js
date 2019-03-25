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
                plugin: "Reihe",
                state: [
                    {
                        plugin: "Einfache Gruppenarbeit",
                        state: {
                            workingPackages: [],
                            startValues: null,
                            setId,
                            StudentsChooseGroup: false,
                        },
                    },
                ],
            })
            state.children.insert(state.children.items.length + 1, {
                plugin: "Reihe",
                state: [
                    {
                        plugin: "Gruppeniteration",
                        state: {
                            groupState: {
                                workingPackages: [],
                                startValues: null,
                                setId: uuid(),
                                StudentsChooseGroup: false,
                            },
                            jigsawGroupId: setId,
                        },
                    },
                ],
            })
        }
    }, [])
    return <div>{state.children.items.map(child => child.render())}</div>
}
