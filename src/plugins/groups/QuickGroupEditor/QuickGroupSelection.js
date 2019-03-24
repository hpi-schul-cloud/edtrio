import React, { useState } from "react"
import styled from "styled-components"

import Button, { Toggle } from "../../../components/Button"
import Text from "../../../components/Text"

const StyledIntroPanel = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    padding-right: 24px;
`

const StyledPreferences = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-left: 16px;
`

const StyledHeader = styled.h2`
    margin-left: 16px;
`

const StyledExplanation = styled(Text)`
    margin-left: 16px;
`

const StyledInputGroup = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 8px 0px;
    align-items: center;
    padding-left: 16px;
    label:before {
        content: " ";
        display: inline-block;
        position: relative;
        top: 5px;
        margin: 0 5px 0 0;
        width: 17px;
        height: 17px;
        border-radius: 11px;
        border: 2px solid rgba(175, 4, 55, 1);
        background-color: transparent;
    }

    input[type="radio"]:checked + label:after {
        border-radius: 11px;
        width: 13px;
        height: 13px;
        position: absolute;
        top: 9px;
        left: 20px;
        content: " ";
        display: block;
        background: rgba(175, 4, 55, 1);
    }

    input[type="radio"] {
        display: none;
    }
`

const StyledLabelText = styled(Text)`
    display: inline;
`
const StyledInput = styled.input`
    width: 35px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    text-align: center;
`

const StyledToggle = styled(Toggle)`
    margin-top: 40px;
`

const StyledRadioGroup = styled.div`
    padding: 12px 0px;
    margin-bottom: 0.75rem;
    background-color: #fff;
    border-radius: 0.25rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
    margin: 8px 0px;
`

const StyledRadioGroupHeadline = styled(Text)`
    font-weight: bold;
    padding-left: 8px;
`
const StyledRadioInput = styled.input``

export function QuickGroupSelection(props) {
    const {
        randomlyAssignStudents,
        setRandomlyAssignStudents,
        removeStudentsFromAllGroups,
        isGroupWork,
        setIsGroupWork,
        setNumberOfGroups,
        createAndFillGroups,
        groups,
        numberOfGroups,
        editable,
        onDragEnd,
        students,
        state,
        setId,
    } = props

    const [numberOfStudentsInGroup, setNumberOfStudentsInGroup] = useState(2)
    const [numberOfGroupsInInput, setNumberOfGroupsInInput] = useState(5)

    return (
        <StyledIntroPanel>
            <StyledHeader>Einfache Gruppenarbeit</StyledHeader>
            <StyledExplanation size={14}>
                {editable ? (
                    <span>
                        Diese Gruppenarbeit ermöglicht eine sehr schnelle
                        Gruppenbildung, erlaubt aber nur ein Aufgabenpaket für
                        alle Gruppen. Für umfangreichere Gruppenszenarien bitte
                        die <i>Komplexe Gruppenarbeit</i> benutzen.
                    </span>
                ) : (
                    <span>
                        {randomlyAssignStudents
                            ? `Die ${numberOfGroups} Gruppen stehen fest. Sie können jedoch live Anpassungen via Drag and Drop vornehmen.`
                            : `Schüler wählen eine der ${numberOfGroups} Gruppen selbst. Sie können jedoch Schüler umordnen oder zuweisen, sollte es zu lange dauern.`}
                    </span>
                )}
            </StyledExplanation>
            {editable && (
                <StyledPreferences>
                    <StyledRadioGroup>
                        <StyledRadioGroupHeadline>
                            Gruppenzahl und -größe
                        </StyledRadioGroupHeadline>
                        <StyledInputGroup>
                            <StyledRadioInput
                                type="radio"
                                name={`${setId}-groupWork`}
                                value="xGroups"
                                checked={isGroupWork}
                                id={`${setId}-xGroups`}
                                onChange={event => {
                                    setIsGroupWork(event.target.checked)
                                    if (event.target.checked) {
                                        setNumberOfGroups(numberOfGroupsInInput)
                                    }
                                }}
                            />
                            <label htmlFor={`${setId}-xGroups`}>
                                {" "}
                                <StyledLabelText>Ich möchte </StyledLabelText>
                                <StyledInput
                                    type="number"
                                    min="2"
                                    onChange={event => {
                                        let value = event.target.value
                                        if (value < 2) {
                                            value = 2
                                        }
                                        if (isGroupWork) {
                                            setNumberOfGroups(value)
                                        }
                                        setNumberOfGroupsInInput(value)
                                    }}
                                    defaultValue={numberOfGroupsInInput}
                                    placeholder="Wie viele Gruppen sollen gebildet werden?"
                                />{" "}
                                <StyledLabelText>
                                    Gruppen bilden
                                </StyledLabelText>
                            </label>
                        </StyledInputGroup>
                        <StyledInputGroup>
                            <StyledRadioInput
                                type="radio"
                                name={`${setId}-groupWork`}
                                value="groupsWithXStudents"
                                id={`${setId}-groupsWithXStudents`}
                                checked={!isGroupWork}
                                onChange={event => {
                                    setIsGroupWork(!event.target.checked)
                                    if (event.target.checked) {
                                        setNumberOfGroups(
                                            Math.ceil(
                                                students.length /
                                                    numberOfStudentsInGroup,
                                            ),
                                        )
                                    }
                                }}
                            />

                            <label htmlFor={`${setId}-groupsWithXStudents`}>
                                {" "}
                                <StyledLabelText>
                                    Ich möchte Gruppen mit je{" "}
                                </StyledLabelText>
                                <StyledInput
                                    type="number"
                                    min="2"
                                    onChange={event => {
                                        if (!isGroupWork) {
                                            setNumberOfGroups(
                                                Math.ceil(
                                                    students.length /
                                                        event.target.value,
                                                ),
                                            )
                                        }

                                        setNumberOfStudentsInGroup(
                                            event.target.value,
                                        )
                                    }}
                                    defaultValue={numberOfStudentsInGroup}
                                    placeholder="Wie viele Schüler sollen in einer Gruppe sein?"
                                />{" "}
                                <StyledLabelText>
                                    Schülern bilden
                                </StyledLabelText>
                            </label>
                        </StyledInputGroup>
                    </StyledRadioGroup>
                    <StyledRadioGroup>
                        <StyledRadioGroupHeadline>
                            Art der Gruppenbildung
                        </StyledRadioGroupHeadline>
                        <StyledInputGroup>
                            <StyledRadioInput
                                type="radio"
                                name={`${setId}-groupAssignment`}
                                value="studentsChoose"
                                checked={randomlyAssignStudents}
                                id={`${setId}-studentsChoose`}
                                onChange={event =>
                                    setRandomlyAssignStudents(
                                        event.target.checked,
                                    )
                                }
                            />
                            <label htmlFor={`${setId}-studentsChoose`}>
                                <StyledLabelText>
                                    Gruppen jetzt zufällig bilden
                                </StyledLabelText>
                            </label>
                        </StyledInputGroup>
                        <StyledInputGroup>
                            <StyledRadioInput
                                type="radio"
                                name={`${setId}-groupAssignment`}
                                value="randomAssignment"
                                id={`${setId}-randomAssignment`}
                                checked={!randomlyAssignStudents}
                                onChange={event =>
                                    setRandomlyAssignStudents(
                                        !event.target.checked,
                                    )
                                }
                            />

                            <label htmlFor={`${setId}-randomAssignment`}>
                                <StyledLabelText>
                                    Schüler wählen Gruppen selbstständig
                                    (während der Stunde)
                                </StyledLabelText>
                            </label>
                        </StyledInputGroup>
                    </StyledRadioGroup>
                </StyledPreferences>
            )}
        </StyledIntroPanel>
    )
}
