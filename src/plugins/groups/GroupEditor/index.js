import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { DragDropContext } from "react-beautiful-dnd"
import uuid from "uuid/v4"

import LessonContext from "~/Contexts/Lesson"
import GroupsContext from "~/Contexts/Groups"

import { useGroupState } from "./useGroupStatev2"
import Button, { Toggle } from "../../../components/Button"
import { WorkingPackages } from "./WorkingPackages"
import { GroupSelection } from "./GroupSelection"
import { GroupSelectionIntro } from "./GroupSelectionIntro"
import { students } from "./mockData"
import { PreviousGroups } from "./PreviousGroups"

const StyledGroupSelection = styled(GroupSelection)`
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 16px
    border-top: 2px solid rgba(0, 0, 0, 0.125);
`
const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    ${({ editable }) =>
        editable
            ? "border: 2px solid rgba(175, 4, 55, 1);"
            : "border: 2px solid #00640030;"}
`

const StyledWorkingPackages = styled(WorkingPackages)`
    border-top: 2px solid rgba(0, 0, 0, 0.125);
    padding: 20px 16px;
`

const StyledTopPanel = styled.div`
    display: flex;
    padding-bottom: 8px;
`

const StyledPreviousGroups = styled(PreviousGroups)`
    flex: 1;
`

const StyledFirstHalf = styled.div`
    ${({ editable }) => (editable ? null : "background: #00640030;")}
`

// ({ editable, focused, state })
export function GroupEditor(props) {
    const { state, startValues, previewId, setId: propsSetId } = props
    const { store } = useContext(LessonContext)
    const editable = store.editing

    const { state: groupState, setState: setGroupState } = useContext(
        GroupsContext,
    )

    let setId = propsSetId ? propsSetId : state.setId()
    if (!state.setId()) {
        setId = propsSetId ? propsSetId : uuid()
        state.setId.set(setId)
    }

    const defaultStartValues = {
        unassignedStudents: students,
        workingPackages: [],
        groups: [],
    }
    if (!groupState[setId]) {
        const newGroupState = { ...groupState }
        newGroupState[setId] = defaultStartValues
        setGroupState(newGroupState)
    }

    const realStartValues = groupState[setId]
        ? groupState[setId]
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
        createEmptyGroups,
        changeGroupName,
        assignRandomStudent,
    ] = useGroupState(realStartValues, state)

    if (workingPackages.length === 0) {
        addWorkingPackage("Aufgabenpaket 1")
    }


    // Save the group to localStorage

    useEffect(() => {
        const updatedStartValues = {
            unassignedStudents,
            workingPackages,
            groups,
        }
        const newGroupState = { ...groupState }
        newGroupState[setId] = updatedStartValues
        setGroupState(newGroupState)
    }, [workingPackages, groups, unassignedStudents])

    const [teacherAssignsStudents, setTeacherAssignsStudents] = useState(
        !state.StudentsChooseGroup(),
    )
    const [studentMoveCounter, setStudentMoveCounter] = useState(0)
    useEffect(() => {
        let randomTimeout
        if (
            !teacherAssignsStudents &&
            !editable &&
            unassignedStudents.length > 0
        ) {
            // simulate Students choosing their own groups
            randomTimeout = setTimeout(() => {
                assignRandomStudent()
                setStudentMoveCounter(studentMoveCounter + 1)
            }, 2000 + Math.random() * studentMoveCounter * 1000)
        }
        return () => {
            clearTimeout(randomTimeout)
        }
    }, [unassignedStudents])

    useEffect(() => {
        state.StudentsChooseGroup.set(!teacherAssignsStudents)
    }, [teacherAssignsStudents])

    const [counter, setCounter] = useState(0)
    useEffect(() => {
        if (workingPackages.length > 0 && editable && counter > 0) {
            if (!teacherAssignsStudents) {
                removeStudentsFromAllGroups()
            }
        }
        setCounter(counter + 1)
    }, [teacherAssignsStudents])

    return (
        <StyledRoot editable={editable}>
            <StyledFirstHalf editable={editable}>
                <StyledTopPanel>
                    <GroupSelectionIntro
                        teacherAssignsStudents={teacherAssignsStudents}
                        setTeacherAssignsStudents={setTeacherAssignsStudents}
                        groups={groups}
                        editable={editable}
                        setId={setId}
                    />
                    {editable && (
                        <StyledPreviousGroups
                            groupState={groupState}
                            setId={setId}
                            previewId={previewId}
                        />
                    )}
                </StyledTopPanel>
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
                        changeGroupName={changeGroupName}
                        students={students}
                    />
                </DragDropContext>
            </StyledFirstHalf>
            <StyledWorkingPackages
                workingPackages={workingPackages}
                state={state}
            />
        </StyledRoot>
    )
}
