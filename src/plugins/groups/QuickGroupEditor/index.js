import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import uuid from "uuid/v4"
import { DragDropContext } from "react-beautiful-dnd"

import Text from "../../../components/Text"
import LessonContext from "~/Contexts/Lesson"
import {
    saveWorkingPackages,
    loadWorkingPackages,
} from "../localStorageHelpers"
import { useGroupState } from "../GroupEditor/useGroupStatev2"
import { students } from "../GroupEditor/mockData"
import Button, { Toggle } from "../../../components/Button"

import {
    UnassignedStudentList,
    LiveUnassignedStudentList,
} from "./UnassignedStudentList"
import { QuickGroupSelection } from "./QuickGroupSelection"
import { Group } from "../Group"

const StyledWorkingPackages = styled.div`
    margin: 16px;
    padding-top: 16px;
    border-top: 2px solid #333333;
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
    border-top: 2px solid #333333;
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
        createEmptyGroups,
    ] = useGroupState(realStartValues, state)

    if (workingPackages.length === 0) {
        addWorkingPackage("Arbeitspaket")
    }

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

    const [isGroupWork, setIsGroupWork] = useState(true)
    const [randomlyAssignStudents, setRandomlyAssignStudents] = useState(
        !state.StudentsChooseGroup(),
    )

    console.log(state.StudentsChooseGroup())
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
