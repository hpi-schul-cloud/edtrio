import React, { PureComponent } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import { Student } from "./Student"
import Button from "../../components/Button"

const StyledUnassignedStudentList = styled.div`
    background: white;
    ${({ isDraggingOver }) =>
        isDraggingOver ? "background: Aquamarine;" : null}
    ${({ draggingFromThisWith }) =>
        draggingFromThisWith ? "background: pink;" : null}
    min-height: 50px;
    min-width: 50px;
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow: scroll;
    ${({ editable }) =>
        editable ? "border: 2px dashed rgba(175, 4, 55, 1);" : "null"}
`

const StudentWrapper = styled.div`
    display: flex;
    margin: 4px 0;
    justify-content: center;
    flex-shrink: 0;
`
const StyledRoot = styled.div`
    padding: 6px;
`

const StyledTitle = styled.h4`
    overflow-wrap: break-word;
    word-break: break-all;
`

const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`

export function StudentList(props) {
    const {
        studentList,
        className,
        droppableId,
        moveStudentsToRandomGroups,
        editable,
    } = props
    return (
        <StyledRoot editable={editable} className={className}>
            <StyledTitle>Nicht zugeordnete Schüler:</StyledTitle>
            <Droppable
                droppableId={droppableId}
                direction="vertical"
                isDropDisabled={false}>
                {(provided, snapshot) => {
                    return (
                        <StyledUnassignedStudentList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            draggingFromThisWith={snapshot.draggingFromThisWith}
                            editable={editable}>
                            <InnerList
                                studentList={studentList}
                                editable={editable}
                            />
                            {provided.placeholder}
                        </StyledUnassignedStudentList>
                    )
                }}
            </Droppable>
            <StyledButtonContainer>
                {studentList.length > 0 && (
                    <Button onClick={moveStudentsToRandomGroups}>
                        {"<-"} zufällig zuordnen
                    </Button>
                )}
            </StyledButtonContainer>
        </StyledRoot>
    )
}

class InnerList extends PureComponent {
    // do not re-render if the students list has not changed

    render() {
        const { editable, studentList } = this.props
        return studentList.map((studentName, index) => (
            <Draggable
                key={studentName}
                draggableId={studentName}
                isDragDisabled={false}
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
        ))
    }
}
