import React from "react"
import styled from "styled-components"

import { Group } from "../Group"
import Button from "../../../components/Button"
import { StudentList } from "../StudentList"

const StyledWorkingPackageGroups = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex: 2;
`

const StyledStudentList = styled(StudentList)`
    flex: 1;
`

const StyledRoot = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid black;
`

const StyledGroups = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const StyledGroup = styled(Group)`
    flex: 1;
    flex-grow: 0;
`

export function GroupSelection(props) {
    const {
        unassignedStudents,
        addGroup,
        addWorkingPackage,
        moveStudentsToRandomGroups,
        workingPackages,
        teacherAssignsStudents,
        editable,
        className,
    } = props
    return (
        <StyledRoot className={className}>
            <StyledWorkingPackageGroups>
                {workingPackages.map((workingPackage, workingPackageIndex) => {
                    return (
                        <div key={workingPackageIndex}>
                            {workingPackage.title}
                            <StyledGroups>
                                {workingPackage.groups.map((group, index) => {
                                    return (
                                        <StyledGroup
                                            key={`group-droppable-${index}`}
                                            studentList={group.students}
                                            droppableId={group.droppableId}
                                            name={group.name}
                                            teacherAssignsStudents={
                                                teacherAssignsStudents
                                            }
                                            editable={editable}
                                        />
                                    )
                                })}
                            </StyledGroups>
                            <Button
                                onClick={() =>
                                    addGroup(
                                        workingPackageIndex,
                                        `group ${workingPackage.groups.length +
                                            1}`,
                                    )
                                }>
                                Gruppe hinzufügen
                            </Button>
                        </div>
                    )
                })}

                <Button
                    onClick={() =>
                        addWorkingPackage(
                            `Arbeitspaket ${workingPackages.length + 1}`,
                        )
                    }>
                    Arbeitpaket hinzufügen
                </Button>
            </StyledWorkingPackageGroups>

            {teacherAssignsStudents && (
                <StyledStudentList
                    studentList={unassignedStudents}
                    droppableId="unassignedStudents"
                    moveStudentsToRandomGroups={moveStudentsToRandomGroups}
                />
            )}
        </StyledRoot>
    )
}
