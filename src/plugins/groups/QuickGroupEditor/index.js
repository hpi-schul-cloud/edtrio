import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import uuid from "uuid/v4"
import { DragDropContext } from "react-beautiful-dnd"

import Text from "../../../components/Text"
import LessonContext from "~/Contexts/Lesson"
import GroupsContext from "~/Contexts/Groups"

import { useGroupState } from "../GroupEditor/useGroupStatev2"
import { students } from "../GroupEditor/mockData"
import Button from "../../../components/Button"

import {
    UnassignedStudentList,
    LiveUnassignedStudentList,
} from "./UnassignedStudentList"
import { QuickGroupSelection } from "./QuickGroupSelection"
import { Group } from "../Group"

const StyledWorkingPackages = styled.div`
    margin: 16px;
    padding-top: 16px;
    border-top: 2px solid rgba(0, 0, 0, 0.125);
`

const StyledGroup = styled(Group)`
    flex: 1;
    flex-grow: 0;
    margin: 0px 8px;
`

const StyledGroupList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    ${({ editable }) =>
        editable
            ? "border: 2px solid rgba(175, 4, 55, 1);"
            : "border: 2px solid #00640030;"}
    border-radius: 3px;
`

const StyledGroupSelection = styled.div`
    display: flex;
    flex-direction: row;
`

const StyledUnassignedStudentList = styled(UnassignedStudentList)`
    flex: 2;
`

const StyledSubHeadline = styled(Text)`
    font-weight: bold;
    padding-left: 8px;
`

const StyledGroups = styled.div`
    margin: 16px;
    padding-top: 16px;
    border-top: 2px solid rgba(0, 0, 0, 0.125);
`

const StyledTeacherView = styled.div`
    ${({ editable }) => (!editable ? "background: #00640030;" : null)}
`
const StyledWorkingPackageContainer = styled.div`
    padding-left: 8px;
`

// ({ editable, focused, state })
export function QuickGroupEditor(props) {
    const { state, startValues } = props
    const { store } = useContext(LessonContext)
    const editable = store.editing

    const { state: groupState, setState: setGroupState } = useContext(
        GroupsContext,
    )

    let setId = state.setId()
    if (!setId) {
        setId = uuid()
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
        addWorkingPackage("Aufgaben")
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

    const [isGroupWork, setIsGroupWork] = useState(true)
    const [randomlyAssignStudents, setRandomlyAssignStudents] = useState(
        !state.StudentsChooseGroup(),
    )
    const [studentMoveCounter, setStudentMoveCounter] = useState(0)
    useEffect(() => {
        let randomTimeout
        if (
            !randomlyAssignStudents &&
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

    const [numberOfGroups, setNumberOfGroups] = useState(5)
    useEffect(() => {
        state.StudentsChooseGroup.set(!randomlyAssignStudents)
    }, [randomlyAssignStudents])

    const [counter, setCounter] = useState(0)
    useEffect(() => {
        if (workingPackages.length > 0 && editable && counter > 0) {
            if (randomlyAssignStudents) {
                createAndFillGroups(numberOfGroups)
            } else {
                createEmptyGroups(numberOfGroups)
            }
        }
        setCounter(counter + 1)
    }, [numberOfGroups, randomlyAssignStudents])

    return (
        <StyledRoot editable={editable}>
            <DragDropContext onDragEnd={onDragEnd}>
                <StyledTeacherView editable={editable}>
                    <StyledGroupSelection>
                        <QuickGroupSelection
                            randomlyAssignStudents={randomlyAssignStudents}
                            setRandomlyAssignStudents={
                                setRandomlyAssignStudents
                            }
                            removeStudentsFromAllGroups={
                                removeStudentsFromAllGroups
                            }
                            isGroupWork={isGroupWork}
                            setIsGroupWork={setIsGroupWork}
                            setNumberOfGroups={setNumberOfGroups}
                            createAndFillGroups={createAndFillGroups}
                            groups={groups}
                            numberOfGroups={numberOfGroups}
                            editable={editable}
                            students={students}
                            onDragEnd={onDragEnd}
                            state={state}
                            setId={setId}
                        />
                        {editable && (
                            <StyledUnassignedStudentList students={students} />
                        )}
                    </StyledGroupSelection>
                    {!editable && !randomlyAssignStudents && (
                        <LiveUnassignedStudentList
                            moveStudentsToRandomGroups={
                                moveStudentsToRandomGroups
                            }
                            students={unassignedStudents}
                        />
                    )}
                    <StyledGroups>
                        <StyledSubHeadline>Gruppen:</StyledSubHeadline>

                        <div>
                            {randomlyAssignStudents && editable && (
                                <Button
                                    onClick={() =>
                                        createAndFillGroups(numberOfGroups)
                                    }>
                                    Gruppen neu durchmischen
                                </Button>
                            )}
                            {groups.length > 0 && (
                                <div>
                                    <StyledGroupList>
                                        {groups.map((group, index) => {
                                            return (
                                                <StyledGroup
                                                    key={`group-droppable-${index}`}
                                                    studentList={group.students}
                                                    droppableId={
                                                        group.droppableId
                                                    }
                                                    name={group.name}
                                                    teacherAssignsStudents={
                                                        randomlyAssignStudents
                                                    }
                                                    maxStudents={Math.ceil(
                                                        students.length /
                                                            numberOfGroups,
                                                    )}
                                                    editable={
                                                        randomlyAssignStudents
                                                            ? editable
                                                            : false
                                                    }
                                                    changeGroupName={
                                                        changeGroupName
                                                    }
                                                    index={index}
                                                />
                                            )
                                        })}
                                    </StyledGroupList>
                                </div>
                            )}
                        </div>
                    </StyledGroups>
                </StyledTeacherView>
            </DragDropContext>

            <StyledWorkingPackages>
                <StyledSubHeadline>
                    Aufgaben der Gruppenarbeit:
                </StyledSubHeadline>
                <StyledWorkingPackageContainer>
                    {state.workingPackages.items.length > 0 &&
                        state.workingPackages.items[0].render()}
                </StyledWorkingPackageContainer>
            </StyledWorkingPackages>
        </StyledRoot>
    )
}
