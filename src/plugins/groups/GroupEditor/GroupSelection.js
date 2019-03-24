import React from "react"
import styled from "styled-components"

import { Group } from "../Group"
import Button from "../../../components/Button"
import Text from "../../../components/Text"
import { StudentList } from "../StudentList"
import { LiveUnassignedStudentList } from "../QuickGroupEditor/UnassignedStudentList"
const StyledWorkingPackageGroups = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    margin-left: 16px;
`

const StyledStudentList = styled(StudentList)`
    flex: 1;
    padding: 0px 16px;
`

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledContent = styled.div`
    display: flex;
    flex-direction: row;
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

const StyledWorkingPackage = styled.div`
    border-radius: 3px;
    border: 2px solid rgba(0, 0, 0, 0.125);
    margin-bottom: 12px;
`

const StyledHeadline = styled(Text)`
    font-weight: bold;
    padding-left: 8px;
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
        groups,
        changeGroupName,
        students,
    } = props

    return (
        <StyledRoot className={className}>
            {!teacherAssignsStudents && !editable && (
                <LiveUnassignedStudentList
                    moveStudentsToRandomGroups={moveStudentsToRandomGroups}
                    students={unassignedStudents}
                />
            )}
            <StyledContent>
                <StyledWorkingPackageGroups>
                    {workingPackages.map(
                        (workingPackage, workingPackageIndex) => {
                            return (
                                <StyledWorkingPackage key={workingPackageIndex}>
                                    <StyledHeadline>
                                        {workingPackage.title}
                                    </StyledHeadline>
                                    <StyledGroups>
                                        {groups
                                            .filter(
                                                group =>
                                                    group.workingPackageId ===
                                                    workingPackage.id,
                                            )
                                            .map((group, index) => {
                                                return (
                                                    <StyledGroup
                                                        key={`group-droppable-${index}`}
                                                        studentList={
                                                            group.students
                                                        }
                                                        droppableId={
                                                            group.droppableId
                                                        }
                                                        name={group.name}
                                                        teacherAssignsStudents={
                                                            teacherAssignsStudents
                                                        }
                                                        maxStudents={Math.ceil(
                                                            students.length /
                                                                groups.length,
                                                        )}
                                                        editable={
                                                            teacherAssignsStudents
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
                                    </StyledGroups>
                                    {editable && (
                                        <Button
                                            onClick={() =>
                                                addGroup(
                                                    workingPackage.id,
                                                    `Gruppe ${groups.length +
                                                        1}`,
                                                )
                                            }>
                                            Gruppe hinzufügen
                                        </Button>
                                    )}
                                </StyledWorkingPackage>
                            )
                        },
                    )}
                    {editable && (
                        <Button
                            onClick={() =>
                                addWorkingPackage(
                                    `Aufgabenpaket ${workingPackages.length +
                                        1}`,
                                )
                            }>
                            Arbeitpaket hinzufügen
                        </Button>
                    )}
                </StyledWorkingPackageGroups>
                {teacherAssignsStudents && (
                    <StyledStudentList
                        studentList={unassignedStudents}
                        droppableId="unassignedStudents"
                        moveStudentsToRandomGroups={moveStudentsToRandomGroups}
                        editable={editable}
                    />
                )}
            </StyledContent>
        </StyledRoot>
    )
}
