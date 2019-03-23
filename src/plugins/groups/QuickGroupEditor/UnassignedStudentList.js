import React, { PureComponent } from "react"
import styled from "styled-components"
import { FullStudent } from "../Student"
import { Droppable, Draggable } from "react-beautiful-dnd"

import Button, { Toggle } from "../../../components/Button"

const StyledStudentBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 8px;
    padding-top: 4px;
    padding-right: 2px;
    margin-block-end: 0.66em;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 6px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
    min-height: 75px;
    ${({ isDraggingOver }) => (isDraggingOver ? "background: Aqua;" : null)}
`

const StudentWrapper = styled.div`
    display: flex;
    margin: 4px 0;
    justify-content: center;
    flex-shrink: 0;
`

const StyledFullStudent = styled(FullStudent)`
    margin: 2px;
`

const StyledRoot = styled.div`
    margin-block-start: 1.33em;
    padding-left: 12px;
    background-color: #fff;
    border-radius: 0.25rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
`

const StyledHeadline = styled.h4`
    padding: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    font-weight: normal;
    margin-block-end: 0.66em;
    margin-block-start: 0.83em;
`

const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`

export function UnassignedStudentList(props) {
    const { students, className } = props
    return (
        <StyledRoot className={className}>
            <StyledHeadline>
                Der Kurs besteht aus <b>{students.length} Schülern</b>:
            </StyledHeadline>
            <StyledStudentBox>
                {students.map((student, index) => (
                    <StyledFullStudent key={index} name={student} />
                ))}
            </StyledStudentBox>
        </StyledRoot>
    )
}

export function LiveUnassignedStudentList(props) {
    const { students, className, moveStudentsToRandomGroups } = props
    return (
        <StyledRoot className={className}>
            <StyledHeadline>
                <b>{students.length} Schüler sind noch nicht zugeordnet</b>:
            </StyledHeadline>
            <Droppable droppableId={"unassignedStudents"} direction="vertical">
                {(provided, snapshot) => {
                    return (
                        <StyledStudentBox
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            draggingFromThisWith={snapshot.draggingFromThisWith}
                            className={className}>
                            <InnerList studentList={students} />
                            {provided.placeholder}
                        </StyledStudentBox>
                    )
                }}
            </Droppable>
            {students.length > 0 && (
                <StyledButtonContainer>
                    <Button
                        onClick={moveStudentsToRandomGroups}
                        primaryColor={"#006400"}
                        tintedPrimaryColor={"#003300"}>
                        zufällig zuordnen
                    </Button>
                </StyledButtonContainer>
            )}
        </StyledRoot>
    )
}

class InnerList extends PureComponent {
    // do not re-render if the students list has not changed

    render() {
        const { studentList } = this.props
        return studentList.map((studentName, index) => (
            <Draggable
                key={studentName}
                draggableId={studentName}
                index={index}>
                {(provided, snapshot) => (
                    <StudentWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <FullStudent name={studentName} />
                    </StudentWrapper>
                )}
            </Draggable>
        ))
    }
}
