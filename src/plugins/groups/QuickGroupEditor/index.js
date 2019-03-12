import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { DragDropContext } from "react-beautiful-dnd"
import uuid from "uuid/v4"

import {
    saveWorkingPackages,
    loadWorkingPackages,
} from "../localStorageHelpers"
import { useGroupState } from "../GroupEditor/useGroupState"
import Button, { Toggle } from "../../../components/Button"
import { WorkingPackages } from "../GroupEditor//WorkingPackages"
import { GroupSelection } from "../GroupEditor/GroupSelection"
import { students } from "../GroupEditor/mockData"
import { Group } from "../Group"

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

const StyledGroup = styled(Group)`
    flex: 1;
    flex-grow: 0;
`

const StyledGroupList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

// ({ editable, focused, state })
export function QuickGroupEditor(props) {
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
        createAndFillGroups,
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

    const [isGroupWork, setIsGroupWork] = useState(true)
    const [randomlyAssignStudents, setRandomlyAssignStudents] = useState(true)
    const [numberOfGroups, setNumberOfGroups] = useState(5)

    return (
        <StyledRoot>
            <StyledHeader>Schnelle Gruppenarbeit</StyledHeader>
            <StyledPreferences>
                <Toggle
                    caption="Schüler wählen Gruppen selbst"
                    activeCaption="Schüler zufällig zuordnen"
                    active={randomlyAssignStudents}
                    onClick={() => {
                        if (randomlyAssignStudents) {
                            removeStudentsFromAllGroups()
                        }
                        setRandomlyAssignStudents(!randomlyAssignStudents)
                    }}
                />
                <Toggle
                    caption="Bilde Gruppen mit x Schülern"
                    activeCaption="Bilde x Gruppen"
                    active={isGroupWork}
                    onClick={() => {
                        if (isGroupWork) {
                            removeStudentsFromAllGroups()
                        }
                        setIsGroupWork(!isGroupWork)
                    }}
                />
            </StyledPreferences>
            {isGroupWork ? (
                <div>
                    Wie viele Gruppen sollen gebildet werden?:{" "}
                    <input
                        type="number"
                        min="2"
                        onChange={event => {
                            let value = event.target.value
                            if (value < 2) {
                                value = 2
                            }
                            setNumberOfGroups(value)
                            createAndFillGroups(value)
                        }}
                        defaultValue="5"
                        placeholder="Wie viele Gruppen sollen gebildet werden?"
                    />
                </div>
            ) : (
                <div>
                    Wie viele Schüler sollen in einer Gruppe sein?:{" "}
                    <input
                        type="number"
                        min="2"
                        onChange={input => console.log(input)}
                        defaultValue="2"
                        placeholder="Wie viele Schüler sollen in einer Gruppe sein?"
                    />
                </div>
            )}

            {randomlyAssignStudents && (
                <div>
                    <Button onClick={() => createAndFillGroups(numberOfGroups)}>
                        Gruppen neu bilden
                    </Button>
                    {workingPackages && workingPackages[0] && (
                        <div>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <StyledGroupList>
                                    {workingPackages[0].groups.map(
                                        (group, index) => {
                                            return (
                                                <StyledGroup
                                                    key={`group-droppable-${index}`}
                                                    studentList={group.students}
                                                    droppableId={
                                                        group.droppableId
                                                    }
                                                    name={group.name}
                                                    teacherAssignsStudents={
                                                        true
                                                    }
                                                    editable={editable}
                                                />
                                            )
                                        },
                                    )}
                                </StyledGroupList>
                            </DragDropContext>
                        </div>
                    )}
                    List of Student groups
                </div>
            )}
            {state.workingPackage.render()}
        </StyledRoot>
    )
}
