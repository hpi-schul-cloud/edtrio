import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import { Student } from "./Student"
import Button from "../../components/Button"

const StyledUnassignedStudentList = styled.div`
    ${({ isDraggingOver }) =>
        isDraggingOver ? "background: Aquamarine;" : null}
    min-height: 50px;
    min-width: 50px;
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow: scroll;
`

const StudentWrapper = styled.div`
    display: flex;
    margin: 4px 0;
    justify-content: center;
    flex-shrink: 0;
`
const StyledRoot = styled.div`
    padding: 6px;
    border: 1px solid black;
`

const StyledTitle = styled.h4`
    overflow-wrap: break-word;
    word-break: break-all;
`

export function StudentList(props) {
    const {
        studentList,
        className,
        droppableId,
        moveStudentsToRandomGroups,
    } = props
    return (
        <StyledRoot>
            <StyledTitle>Nicht zugeordnete Schüler:</StyledTitle>
            <Droppable droppableId={droppableId} direction="vertical">
                {(provided, snapshot) => {
                    return (
                        <StyledUnassignedStudentList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            className={className}>
                            {studentList.map((studentName, index) => (
                                <Draggable
                                    key={studentName}
                                    draggableId={studentName}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <StudentWrapper
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Student name={studentName} />
                                        </StudentWrapper>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </StyledUnassignedStudentList>
                    )
                }}
            </Droppable>
            {studentList.length > 0 && (
                <Button onClick={moveStudentsToRandomGroups}>
                    {"<-"} zufällig zuordnen
                </Button>
            )}
        </StyledRoot>
    )
}
