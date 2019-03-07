import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import { Student } from "./Student"

const StyledGroupedStudentList = styled.div`
    background: ivory;
    ${({ isDraggingOver }) => (isDraggingOver ? "background: blue;" : null)}
    min-height: 50px;
    min-width: 50px;
    display: flex;
    flex-direction: row;
    flex: 2;
    border: 1px solid black;
    flex-wrap: wrap;
    box-shadow: inset 0 0 10px Grey;
    padding: 6px;
`

const StyledRoot = styled.div``

const StudentWrapper = styled.div`
    display: flex;
    margin: 4px;
    justify-content: center;
    flex-shrink: 0;
`

export function Group(props) {
    return (
        <StyledRoot>
            Gruppe {props.name}
            <Droppable droppableId={props.droppableId} direction="horizontal">
                {(provided, snapshot) => {
                    return (
                        <StyledGroupedStudentList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}>
                            {props.studentList.map((studentName, index) => (
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
                        </StyledGroupedStudentList>
                    )
                }}
            </Droppable>
        </StyledRoot>
    )
}
