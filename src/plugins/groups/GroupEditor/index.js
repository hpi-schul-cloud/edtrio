import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { DragDropContext } from "react-beautiful-dnd"
import uuid from "uuid/v4"

import {
    saveWorkingPackages,
    loadWorkingPackages,
} from "../localStorageHelpers"
import { useGroupState } from "./useGroupState"
import Button, { Toggle } from "../../../components/Button"
import { WorkingPackages } from "./WorkingPackages"
import { GroupSelection } from "./GroupSelection"
import { students } from "./mockData"

const StyledGroupSelection = styled(GroupSelection)`
    margin: 20px;
`
const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid red;
`

const StyledPreferences = styled.div`
    display: flex;
    justify-content: flex-end;
`

const StyledHeader = styled.h2`
    margin-left: 16px;
`

const StyledWorkingPackages = styled(WorkingPackages)`
    margin-left: 16px;
`

// ({ editable, focused, state })
export function GroupEditor(props) {
    const { editable, state, startWorkingPackage } = props
    // TODO: these default props probably belong to the editor state somehow
    const [
        workingPackages,
        unassignedStudents,
        onDragEnd,
        addGroup,
        addWorkingPackage,
        moveStudentsToRandomGroups,
        removeStudentsFromAllGroups,
        updateWorkingPackages,
    ] = useGroupState(
        students,
        startWorkingPackage ? startWorkingPackage : state.workingPackages,
        state,
    )
    // Save the group to localStorage
    let groupId = state.groupId()
    if (!groupId) {
        groupId = uuid()
        state.groupId.set(groupId)
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("saved")
            saveWorkingPackages(groupId, workingPackages)
        }, 3000)
        return () => {
            clearTimeout(timeout)
        }
    })

    const [teacherAssignsStudents, setTeacherAssignsStudents] = useState(true)
    return (
        <StyledRoot>
            <StyledHeader>Gruppenarbeit</StyledHeader>
            <StyledPreferences>
                <Button
                    onClick={() =>
                        updateWorkingPackages(loadWorkingPackages()["set 1"])
                    }>
                    Lade vorige Gruppen
                </Button>
                <Toggle
                    caption="Schüler wählen Gruppen selbst"
                    activeCaption="Schüler selbst zuordnen"
                    active={teacherAssignsStudents}
                    onClick={() => {
                        if (teacherAssignsStudents) {
                            removeStudentsFromAllGroups()
                        }
                        setTeacherAssignsStudents(!teacherAssignsStudents)
                    }}
                />
            </StyledPreferences>
            <DragDropContext onDragEnd={onDragEnd}>
                <StyledGroupSelection
                    unassignedStudents={unassignedStudents}
                    addGroup={addGroup}
                    addWorkingPackage={addWorkingPackage}
                    moveStudentsToRandomGroups={moveStudentsToRandomGroups}
                    workingPackages={workingPackages}
                    teacherAssignsStudents={teacherAssignsStudents}
                />
            </DragDropContext>
            <StyledWorkingPackages
                workingPackages={workingPackages}
                state={state}
            />
        </StyledRoot>
    )
}
