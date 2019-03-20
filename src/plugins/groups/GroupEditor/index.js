import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { DragDropContext } from "react-beautiful-dnd"
import uuid from "uuid/v4"

import LessonContext from "~/Contexts/Lesson"
import {
    saveWorkingPackages,
    loadWorkingPackages,
} from "../localStorageHelpers"
import { useGroupState } from "./useGroupStatev2"
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
    const { state, startValues } = props
    const { store } = useContext(LessonContext)
    const editable = store.editing
    console.log("rerendered")
    // get StartValues from Props
    const defaultStartValues = {
        unassignedStudents: students,
        workingPackages: [],
        groups: [],
    }

    const realStartValues = state.startValues()
        ? state.startValues()
        : startValues
        ? startValues
        : defaultStartValues
    const [
        workingPackages,
        groups,
        unassignedStudents,
        onDragEnd,
        addGroup,
        addWorkingPackage,
        moveStudentsToRandomGroups,
        removeStudentsFromAllGroups,
        createAndFillGroups,
    ] = useGroupState(realStartValues, state)

    // Save the group to localStorage
    let setId = state.setId()
    if (!setId) {
        setId = uuid()
        state.setId.set(setId)
    }
    useEffect(() => {
        const updatedStartValues = {
            unassignedStudents,
            workingPackages,
            groups,
        }
        state.startValues.set(updatedStartValues)
    }, [workingPackages, groups, unassignedStudents])
    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("saved")
            saveWorkingPackages(setId, workingPackages)
        }, 2000)
        return () => {
            clearTimeout(timeout)
        }
    }, [workingPackages, groups, unassignedStudents])

    const [teacherAssignsStudents, setTeacherAssignsStudents] = useState(true)
    return (
        <StyledRoot>
            <StyledHeader>Gruppenarbeit</StyledHeader>
            {editable && (
                <StyledPreferences>
                    <Button
                        onClick={() => {
                            // TODO: fill
                        }}>
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
            )}
            <DragDropContext onDragEnd={onDragEnd}>
                <StyledGroupSelection
                    unassignedStudents={unassignedStudents}
                    addGroup={addGroup}
                    addWorkingPackage={addWorkingPackage}
                    moveStudentsToRandomGroups={moveStudentsToRandomGroups}
                    workingPackages={workingPackages}
                    groups={groups}
                    teacherAssignsStudents={teacherAssignsStudents}
                    editable={editable}
                />
            </DragDropContext>
            <StyledWorkingPackages
                workingPackages={workingPackages}
                state={state}
            />
        </StyledRoot>
    )
}
