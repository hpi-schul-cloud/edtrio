import React, { useState } from "react"
import styled from "styled-components"
import { DragDropContext } from "react-beautiful-dnd"

import { Group } from "../Group"
import { StudentList } from "../StudentList"
import { useGroupState } from "./useGroupState"
import Button, { Toggle } from "../../../components/Button"

const students = [
    "Jasmine Hertz",
    "Raquel Aho",
    "Lannie Hubley",
    "Samantha Jensen",
    "Giovanna Rosebrock",
    "Corrinne Volkmann",
    "Retta Shelly",
    "Tiana Chavers",
    "Petronila Poucher",
    "Sherlyn Nichols",
    "Gaynell Ghent",
    "Alton Wynn",
    "Keesha Lomanto",
    "Donnie Odom",
    "Rosanne Rapozo",
    "Reuben Landrum",
    "Anastacia Fralick",
    "Freda Mailman",
    "Winston Lamphear",
    "Therese Snay",
    "Maegan Nakashima",
    "Janessa Ewell",
    "Lorenza Pletcher",
    "Gil Holdsworth",
    "Keshia Ocasio",
    "Sasha Garoutte",
    "Noreen Cowell",
    "Martin Gupta",
    "Isela Wein",
    "Pattie Mcreynolds",
]

const StyledGroupSelection = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: row;
    border: 1px solid black;
`

const StyledGroups = styled.div``

const StyledStudentList = styled(StudentList)`
    flex: 1;
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

const StyledWorkingPackages = styled.div`
    margin-left: 16px;
    border: 1px solid black;
`

const TabTitles = styled.div`
    display: flex;
`

const GroupTab = styled.div`
    flex: 1;
    padding: 0 8px;
    ${({ selected }) =>
        selected
            ? "border: 1px solid black; border-bottom: none;"
            : "border-bottom: 1px solid black;"}
`

const StyledWorkingPackageGroups = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex: 2;
`

// ({ editable, focused, state })
export function GroupEditor(props) {
    const [
        workingPackages,
        unassignedStudents,
        onDragEnd,
        addGroup,
        addWorkingPackage,
        moveStudentsToRandomGroups,
    ] = useGroupState(students)

    const [teacherAssigns, setTeacherAssigns] = useState(false)
    const [tabSelected, changeSelectedTab] = useState(0)
    return (
        <StyledRoot>
            <StyledHeader>Gruppenarbeit</StyledHeader>
            <StyledPreferences>
                <Toggle
                    caption="Schüler selbst zuordnen"
                    activeCaption="Schüler wählen Gruppen selbst"
                    active={teacherAssigns}
                    onClick={() => setTeacherAssigns(!teacherAssigns)}
                />
            </StyledPreferences>
            <DragDropContext onDragEnd={onDragEnd}>
                <StyledGroupSelection>
                    <StyledWorkingPackageGroups>
                        {workingPackages.map(
                            (workingPackage, workingPackageIndex) => {
                                return (
                                    <div key={workingPackageIndex}>
                                        {workingPackage.title}
                                        <StyledGroups>
                                            {workingPackage.groups.map(
                                                (group, index) => {
                                                    return (
                                                        <Group
                                                            key={`group-droppable-${index}`}
                                                            studentList={
                                                                group.students
                                                            }
                                                            droppableId={
                                                                group.droppableId
                                                            }
                                                            name={group.name}
                                                        />
                                                    )
                                                },
                                            )}
                                        </StyledGroups>
                                        <Button
                                            onClick={() =>
                                                addGroup(
                                                    workingPackageIndex,
                                                    `group ${workingPackage
                                                        .groups.length + 1}`,
                                                )
                                            }>
                                            Gruppe hinzufügen
                                        </Button>
                                    </div>
                                )
                            },
                        )}

                        <Button
                            onClick={() =>
                                addWorkingPackage(
                                    `Arbeitspaket ${workingPackages.length +
                                        1}`,
                                )
                            }>
                            Arbeitpaket hinzufügen
                        </Button>
                    </StyledWorkingPackageGroups>

                    <StyledStudentList
                        studentList={unassignedStudents}
                        droppableId="unassignedStudents"
                        moveStudentsToRandomGroups={moveStudentsToRandomGroups}
                    />
                </StyledGroupSelection>
            </DragDropContext>
            <StyledWorkingPackages>
                Arbeitspakete:
                <TabTitles>
                    {workingPackages.map((workingPackage, id) => (
                        <GroupTab
                            key={id}
                            selected={id === tabSelected}
                            onClick={() => changeSelectedTab(id)}>
                            {workingPackage.title}
                        </GroupTab>
                    ))}
                </TabTitles>
                {workingPackages.length > 0 &&
                    workingPackages[tabSelected].content}
            </StyledWorkingPackages>
        </StyledRoot>
    )
}
