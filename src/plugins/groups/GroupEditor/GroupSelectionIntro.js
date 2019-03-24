import React, { useState } from "react"
import styled from "styled-components"

import Button, { Toggle } from "../../../components/Button"
import Text from "../../../components/Text"

const StyledIntroPanel = styled.div`
    flex: 1;
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

export function GroupSelectionIntro(props) {
    const {
        teacherAssignsStudents,
        setTeacherAssignsStudents,
        groups,
        editable,
        setId,
    } = props

    return (
        <StyledIntroPanel>
            <StyledHeader>Komplexe Gruppenarbeit</StyledHeader>
            <StyledExplanation size={14}>
                {editable ? (
                    <span>
                        Diese Gruppenarbeit ermöglicht eine umfangreiche
                        Gruppenbildung. Mehrere Aufgabenpakete können auf
                        beliebig viele Gruppen aufgeteilt werden. Für einfachere
                        Gruppenszenarien kann die <i>Einfache Gruppenarbeit</i>{" "}
                        genutzt werden.
                    </span>
                ) : (
                    <span>
                        {teacherAssignsStudents
                            ? `Die ${
                                  groups.length
                              } Gruppen stehen fest. Sie können jedoch live Anpassungen via Drag and Drop vornehmen.`
                            : `Schüler wählen eine der ${
                                  groups.length
                              } Gruppen selbst. Sie können jedoch Schüler umordnen oder zuweisen, sollte es zu lange dauern.`}
                    </span>
                )}
            </StyledExplanation>
            {editable && (
                <StyledPreferences>
                    <StyledRadioGroup>
                        <StyledRadioGroupHeadline>
                            Art der Gruppenbildung
                        </StyledRadioGroupHeadline>
                        <StyledInputGroup>
                            <StyledRadioInput
                                type="radio"
                                name={`${setId}-groupAssignment`}
                                value="studentsChoose"
                                checked={teacherAssignsStudents}
                                id={`${setId}-studentsChoose`}
                                onChange={event =>
                                    setTeacherAssignsStudents(
                                        event.target.checked,
                                    )
                                }
                            />
                            <label htmlFor={`${setId}-studentsChoose`}>
                                <StyledLabelText>
                                    Gruppen jetzt manuell bilden
                                </StyledLabelText>
                            </label>
                        </StyledInputGroup>
                        <StyledInputGroup>
                            <StyledRadioInput
                                type="radio"
                                name={`${setId}-groupAssignment`}
                                value="randomAssignment"
                                id={`${setId}-randomAssignment`}
                                checked={!teacherAssignsStudents}
                                onChange={event =>
                                    setTeacherAssignsStudents(
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
