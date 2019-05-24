import React, { useState, useEffect, useContext, useMemo } from "react"
import styled from "styled-components"
import { DragDropContext } from "react-beautiful-dnd"
import uuid from "uuid/v4"

import LessonContext from "~/Contexts/Lesson"
import GroupsContext from "~/Contexts/Groups"

import { useGroupState } from "./useGroupStatev2"
import Button, { Toggle } from "../../../components/Button"
import Text from "../../../components/Text"

import { GroupIcon, JigsawIcon } from "../GroupsOverview/Icons"

import { WorkingPackages } from "./WorkingPackages"
import { GroupSelection } from "./GroupSelection"
import { students } from "./mockData"
import { PreviousGroups } from "./PreviousGroups"
import { Group } from "../Group"

const StyledGroupSelection = styled(GroupSelection)`
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 16px
    border-top: 2px solid rgba(0, 0, 0, 0.125);
`
const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    padding: 24px;
`

const StyledWorkingPackages = styled(WorkingPackages)`
    border-top: 2px solid rgba(0, 0, 0, 0.125);
`

const StyledTopPanel = styled.div`
    display: flex;
    padding-bottom: 8px;
    flex-direction: column;
`

const StyledPreviousGroups = styled(PreviousGroups)`
    flex: 1;
`

const StyledFirstHalf = styled.div`
    ${({ editable }) => (editable ? null : "background: #00640030;")}
`

const StyledHeadline = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const StyledGroupIcon = styled(GroupIcon)`
    width: 50px;
    height: 50px;
    margin-left: 16px;
`

const StyledJigsawIcon = styled(JigsawIcon)`
    width: 50px;
    height: 50px;
    margin-left: 16px;
`

const StyledGroups = styled.div`
    padding-top: 16px;
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

// ({ editable, focused, state })
export function GroupEditor(props) {
    const { state, startValues, previewId, setId: propsSetId } = props
    const isPartOfJigsaw = state.isPartOfJigsaw()

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
        addWorkingPackage(isPartOfJigsaw ? "Paket 1" : "Aufgabenpaket 1")
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

    const coupledToId = state.coupledToId()

    let coupledGroupState = groupState[coupledToId]
    let newGroups = []

    newGroups = useMemo(() => {
        const groups = []

        if (isPartOfJigsaw && groupState[coupledToId]) {
            // get coupledGroupState
            coupledGroupState = groupState[coupledToId]

            // jigsaw those groups

            // DO JIGSAW magic
            // minimal group size = new group number
            const newGroupNumber = coupledGroupState.groups
                .map(group => group.students.length)
                .reduce(function(a, b) {
                    return Math.min(a, b)
                })

            // create work packages, if necessary
            if (workingPackages.length < newGroupNumber) {
                addWorkingPackage(`Paket ${workingPackages.length + 1}`)
            }

            // create groups
            for (let i = 1; i <= newGroupNumber; i++) {
                if (workingPackages[i - 1]) {
                    groups.push({
                        students: [],
                        name: `Gruppe ${i}`,
                        droppableId: `group ${i}`,
                        workingPackageId: workingPackages[i - 1].id,
                    })
                }
            }

            // fill new groups
            if (groups.length === newGroupNumber) {
                coupledGroupState.groups.forEach((group, groupIndex) => {
                    group.students.forEach((student, studentIndex) => {
                        groups[studentIndex % newGroupNumber].students.push(
                            student,
                        )
                    })
                })
            }
        }
        console.log(groups)
        return groups
    }, [workingPackages.length, groupState, isPartOfJigsaw])

    return (
        <StyledRoot editable={editable}>
            <StyledHeadline>
                <h2>
                    {isPartOfJigsaw
                        ? "Gruppenpuzzle - Phase Zwei:"
                        : "Gruppenarbeit"}{" "}
                    (
                    {groups.length === 1
                        ? "1 Gruppe"
                        : `${groups.length} Gruppen`}
                    )
                </h2>
                {isPartOfJigsaw ? <StyledJigsawIcon /> : <StyledGroupIcon />}
            </StyledHeadline>
            {isPartOfJigsaw && (
                <Text>
                    Dies ist die zweite Phase des Gruppenpuzzles. Hier können
                    die Arbeitsaufträge und Materialien für die Expertengruppen
                    eingefügt werden, auf die die Schüler zufällig zugeteilt
                    wurden. Die Gruppen können daher nicht mehr manuell
                    verändert werden.
                </Text>
            )}
            <Text size={14}>
                {!editable && (
                    <span>
                        {teacherAssignsStudents
                            ? `Die ${
                                  groups.length
                              } Gruppen stehen fest. Sie können jedoch live Anpassungen via Drag and Drop vornehmen.`
                            : `Schüler wählen eine der ${
                                  groups.length
                              } Gruppen selbst. Sie können jedoch Schüler umordnen oder zuweisen, sollte es zu lange dauern.`}
                    </span>
                )}
            </Text>
            <StyledWorkingPackages
                workingPackages={
                    isPartOfJigsaw
                        ? workingPackages.slice(0, newGroups.length)
                        : workingPackages
                }
                state={state}
                addWorkingPackage={addWorkingPackage}
                editable={editable}
                staticNumberOfWorkingPackages={true}
            />
            {isPartOfJigsaw ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div>
                        {coupledGroupState && newGroups && (
                            <StyledGroups>
                                <div>
                                    {newGroups.length > 0 && (
                                        <div>
                                            <StyledGroupList>
                                                {newGroups.map(
                                                    (group, index) => {
                                                        return (
                                                            <StyledGroup
                                                                key={`group-droppable-${index}`}
                                                                studentList={
                                                                    group.students
                                                                }
                                                                droppableId={
                                                                    group.droppableId
                                                                }
                                                                name={
                                                                    group.name
                                                                }
                                                                teacherAssignsStudents={
                                                                    true
                                                                }
                                                                maxStudents={Math.ceil(
                                                                    students.length /
                                                                        newGroups.length,
                                                                )}
                                                                editable={false}
                                                                changeGroupName={
                                                                    changeGroupName
                                                                }
                                                                index={index}
                                                                disableDND={
                                                                    true
                                                                }
                                                            />
                                                        )
                                                    },
                                                )}
                                            </StyledGroupList>
                                        </div>
                                    )}
                                </div>
                            </StyledGroups>
                        )}
                    </div>
                </DragDropContext>
            ) : (
                <>
                    {editable && (
                        <StyledPreviousGroups
                            groupState={groupState}
                            setId={setId}
                            previewId={previewId}
                        />
                    )}
                    <StyledFirstHalf editable={editable}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <StyledGroupSelection
                                unassignedStudents={unassignedStudents}
                                addGroup={addGroup}
                                addWorkingPackage={addWorkingPackage}
                                moveStudentsToRandomGroups={
                                    moveStudentsToRandomGroups
                                }
                                workingPackages={workingPackages}
                                groups={groups}
                                teacherAssignsStudents={teacherAssignsStudents}
                                editable={editable}
                                changeGroupName={changeGroupName}
                                students={students}
                                setTeacherAssignsStudents={
                                    setTeacherAssignsStudents
                                }
                                setId={setId}
                            />
                        </DragDropContext>
                    </StyledFirstHalf>
                </>
            )}
        </StyledRoot>
    )
}
