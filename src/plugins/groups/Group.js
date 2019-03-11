import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import { Student } from "./Student"
import Input from "../../components/Input"

const StyledGroupedStudentList = styled.div`
    ${({ editable }) =>
        editable ? "background: ivory; box-shadow: inset 0 0 10px Grey;" : null}
    ${({ isDraggingOver }) =>
        isDraggingOver ? "background: blue;" : null}
    min-height: 50px;
    min-width: 50px;
    display: flex;
    flex-direction: row;
    flex: 2;
    border: 1px solid black;
    flex-wrap: wrap;

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
    const {
        teacherAssignsStudents,
        name,
        studentList,
        droppableId,
        editable,
    } = props
    return (
        <StyledRoot>
            Gruppe <Input onChange={input => console.log(input)} value={name} />{" "}
            ({studentList.length})
            {teacherAssignsStudents && (
                <Droppable droppableId={droppableId} direction="horizontal">
                    {(provided, snapshot) => {
                        return (
                            <StyledGroupedStudentList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                                editable={true}>
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
                            </StyledGroupedStudentList>
                        )
                    }}
                </Droppable>
            )}
            {!teacherAssignsStudents && (
                <div>
                    maximale Gruppengröße:{" "}
                    <input
                        type="number"
                        min="0"
                        onChange={input => console.log(input)}
                        defaultValue="8"
                        placeholder="Setze eine maximale Gruppengröße"
                    />
                </div>
            )}
        </StyledRoot>
    )
}
