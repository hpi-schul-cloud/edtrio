import React, { PureComponent } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import { Student } from "./Student"
import Input from "../../components/Input"
import Text from "../../components/Text"

const StyledGroupedStudentList = styled.div`
    background: White;
    ${({ editable }) =>
        editable
            ? "border: 2px dashed rgba(175, 4, 55, 1);  "
            : "border: 1px solid #333333;"}
    ${({ isDraggingOver }) => (isDraggingOver ? "background: Aqua;" : null)}
    ${({ draggingFromThisWith }) =>
        draggingFromThisWith ? "background: pink;" : null}
    min-height: 50px;
    min-width: 50px;
    display: flex;
    flex-direction: row;
    flex: 2;
    flex-wrap: wrap;
    justify-content: center;
    padding: 6px;
    min-height: 75px;
    border-radius: 3px;
`

const StyledRoot = styled.div`
    margin: 8px;
`

const StudentWrapper = styled.div`
    display: flex;
    margin: 4px;
    justify-content: center;
    flex-shrink: 0;
`

const StyledStudentNumber = styled.div`
    display: flex;
    justify-content: center;
`

export function Group(props) {
    const {
        teacherAssignsStudents,
        index,
        name,
        studentList,
        droppableId,
        editable,
        className,
        maxStudents,
        changeGroupName,
        direction = "vertical",
    } = props
    return (
        <StyledRoot className={className}>
            <Input
                onChange={input => changeGroupName(index, input)}
                value={name}
            />
            <StyledStudentNumber>
                <Text inline noMargin center>
                    {teacherAssignsStudents ? (
                        <span>({studentList.length} Schüler)</span>
                    ) : (
                        <span>
                            ({studentList.length} von {maxStudents} geplanten
                            Schülern)
                        </span>
                    )}
                </Text>
            </StyledStudentNumber>
            <Droppable
                droppableId={droppableId}
                direction={direction}
                isDropDisabled={false}>
                {(provided, snapshot) => {
                    return (
                        <StyledGroupedStudentList
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
                        </StyledGroupedStudentList>
                    )
                }}
            </Droppable>
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
